const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { URL } = require('url');
const pool = require('./db');
const { sendRsvpConfirmationSms } = require("./twilio");
const app = express();
app.set('trust proxy', 1);

// Middleware
app.use(
    cors({
        origin: true,
        credentials: true
}));
app.use(express.json());

function normalizePhoneNumber(phone) {
    const digits = String(phone).replace(/\D/g, '');

    // USA Country code already added by user
    if(digits.length === 11 && digits.startsWith('1')) {
        return `+${digits}`;
    }

    // Add USA country code
    if(digits.length === 10) {
        return `+1${digits}`;
    }

    // If number format is invalid
    return null;
}

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length > 0) {
        return forwarded.split(',')[0].trim();
    }

    return req.ip || req.socket?.remoteAddress || 'unknown';
}

function createRouteRateLimiter({ windowMs, maxRequests }) {
    const requestLog = new Map();

    return (req, res, next) => {
        const now = Date.now();
        const key = `${req.path}:${getClientIp(req)}`;
        const entry = requestLog.get(key) || [];

        const recentTimestamps = entry.filter((timestamp) => now - timestamp < windowMs);

        if (recentTimestamps.length >= maxRequests) {
        return res.status(429).json({ error: 'RATE_LIMITED' });
        }

        recentTimestamps.push(now);
        requestLog.set(key, recentTimestamps);
        next();
    };
}

function validateGuestCheckPayload(body) {
    if (!body || typeof body !== 'object') return 'NAME_REQUIRED';
    if (typeof body.name !== 'string') return 'NAME_REQUIRED';
    if (!body.name.trim()) return 'NAME_REQUIRED';
    return null;
}

function validateRsvpPayload(body) {
    const phoneRegex = /^(\+1\s?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;

    if (!body || typeof body !== 'object') return 'MISSING_FIELDS';

    const { name, phone, attending, dinner, individualAttendance } = body;

    if (!name || !phone || !attending) {
        return 'MISSING_FIELDS';
    }

    if (typeof name !== 'string' || !name.trim()) {
        return 'NAME_REQUIRED';
    }

    if (typeof phone !== 'string') {
        return 'PHONE_INVALID';
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    if (!normalizedPhone) {
        return 'PHONE_INVALID';
    }

    if (!phoneRegex.test(phone)) {
        return 'PHONE_FORMAT';
    }

    if (!individualAttendance || typeof individualAttendance !== 'object' || Array.isArray(individualAttendance)) {
        return 'INDIVIDUAL_INVALID';
    }

    if (attending !== 'yes' && attending !== 'no') {
        return 'ATTENDING_INVALID';
    }

    if (attending === 'yes' && dinner !== 'yes' && dinner !== 'no') {
        return 'DINNER_INVALID';
    }

    const allValid = Object.values(individualAttendance).every((value) => {
        if (!value || typeof value !== 'object') return false;
        if (value.rsvp !== 'yes' && value.rsvp !== 'no') return false;
        if (value.rsvp === 'yes') {
        return value.dinner === 'yes' || value.dinner === 'no';
        }

        return true;
    });

    if (!allValid) {
        return 'PARTY_INCOMPLETE';
    }

    return null;
}

const guestCheckLimiter = createRouteRateLimiter({
    windowMs: 10 * 60 * 1000,
    maxRequests: 40,
});

const rsvpLimiter = createRouteRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 15,
});

// Test route
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// RSVP Handler
app.post('/api/rsvp', rsvpLimiter, async (req, res) => {
    const payloadError = validateRsvpPayload(req.body);
    if (payloadError) {
        return res.status(400).json({ error: payloadError });
    }

    const { name, phone, attending, dinner, individualAttendance, language } = req.body;
    const normalizedPhone = normalizePhoneNumber(phone);
    const isAttending = attending === 'yes';
    const isAttendingDinner = dinner === 'yes' ? true : dinner === 'no' ? false : null;

    try {
        const guestResult = await pool.query(`SELECT * FROM guests WHERE LOWER(name) = LOWER($1)`, [name.trim()]);

        if (guestResult.rows.length === 0) {
        return res.status(400).json({ error: 'GUEST_NOT_FOUND_DB' });
        }

        const guest = guestResult.rows[0];

        await pool.query(`UPDATE guests SET phone = $1 WHERE id = $2`, [normalizedPhone, guest.id]);

        const rsvpResult = await pool.query(`SELECT id FROM rsvps WHERE guest_id = $1`, [guest.id]);

        const jsonAttendance = JSON.stringify(individualAttendance);

        if (rsvpResult.rows.length > 0) {
        await pool.query(
            `UPDATE rsvps
            SET attending = $1, dinner = $2, individual_attendance = $3, timestamp = CURRENT_TIMESTAMP
            WHERE guest_id = $4`,
            [isAttending, isAttendingDinner, jsonAttendance, guest.id],
        );
        } else {
        await pool.query(
            `INSERT INTO rsvps (guest_id, attending, dinner, individual_attendance)
            VALUES ($1, $2, $3, $4)`,
            [guest.id, isAttending, isAttendingDinner, jsonAttendance],
        );
    }

    

    try {
        await sendRsvpConfirmationSms({
        to: normalizedPhone,
        name: name.trim(),
        language,
        });
        console.log('Confirmation SMS sent');
        } catch (smsErr) {
        console.error('Twilio SMS failed:', smsErr?.message || smsErr);
        }

        return res.status(200).json({ message: 'RSVP received!' });
    } catch (err) {
        console.error('Error handling RSVP:', err.stack || err);
        return res.status(500).json({ error: 'RSVP_SAVE_FAILED' });
    }
});

// Guest Check for valid RSVP
app.post('/api/guest-check', guestCheckLimiter, async (req, res) => {
    const payloadError = validateGuestCheckPayload(req.body);
    if (payloadError) {
        return res.status(400).json({ error: payloadError });
    }

    const name = req.body.name.trim();

    try {
        const guestResult = await pool.query('SELECT * FROM guests WHERE LOWER(name) = LOWER($1)', [name]);

        if (guestResult.rows.length === 0) {
            return res.status(404).json({ error: 'GUEST_NOT_FOUND' });
        }
        const mainGuest = guestResult.rows[0];

        const householdResult = await pool.query('SELECT name FROM guests WHERE household_id = $1', [mainGuest.id]);

        let householdGuests;

        if (householdResult.rows.length === 0) {
        householdGuests = [];
        } else {
        const householdNames = householdResult.rows.map((row) => row.name);
        householdGuests = householdNames.includes(mainGuest.name)
            ? householdNames
            : [mainGuest.name, ...householdNames];
        }

        const rsvpResult = await pool.query('SELECT * FROM rsvps WHERE guest_id = $1', [mainGuest.id]);

        const existing = rsvpResult.rows.length > 0 ? { ...rsvpResult.rows[0], phone: mainGuest.phone } : null;

        return res.status(200).json({
        success: true,
        guests: householdGuests,
        existing,
        });
    } catch (err) {
        console.error('Guest check error:', err.stack || err);
        return res.status(500).json({ error: 'RSVP_SAVE_FAILED' });
    }
});

// RSVP Admin Page
app.get('/api/admin/rsvps', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, g.name, g.phone
            FROM public.rsvps r
            JOIN public.guests g ON r.guest_id = g.id
        `);

        const data = result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        phone: row.phone,
        attending: row.attending,
        dinner: row.dinner,
        individual_attendance: row.individual_attendance,
        timestamp: row.timestamp,
        contacted: row.contacted,
        notes: row.notes,
        }));

        res.json(data);
    } catch (err) {
        console.error('Admin RSVP fetch error:', err.stack || err);
        return res.status(500).json({ error: 'Failed to fetch RSVPs ' });
    }
});

// Admin RSVP Deletion
app.delete('/api/admin/rsvp/:id', async (req, res) => {
    const rsvpId = req.params.id;

    try {
        const result = await pool.query(`
            DELETE FROM rsvps WHERE id = $1 RETURNING *`, [rsvpId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'RSVP not found' });
        }

        res.json({ message: 'RSVP deleted successfully' });
    } catch (err) {
        console.error('Error deleting RSVP:', err);
        res.status(500).json({ error: 'Failed to delete RSVP' });
    }
});

// Admin RSVP Edit
app.put('/api/admin/rsvps/:id', async (req, res) => {
    const { id } = req.params;
    const { phone, attending, dinner, contacted, notes } = req.body;

    try {
    await pool.query(
        `UPDATE guests
        SET phone = $1
        WHERE id = (SELECT guest_id FROM rsvps WHERE id = $2)`,
        [phone, id],
    );
    
    await pool.query(
        `UPDATE rsvps
        SET attending = $1, dinner = $2, timestamp = CURRENT_TIMESTAMP, contacted = $3, notes = $4
        WHERE id = $5`,
        [attending, dinner, contacted, notes, id],
        );

        return res.status(200).json({ message: 'RSVP Updated' });
    } catch (err) {
        console.error('Edit RSVP error:', err.stack || err);
        return res.status(500).json({ error: 'Server error during update' });
    }
});

module.exports = app;
