/* eslint-disable no-undef */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;

console.log("DATABASE_URL exists?", !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    console.log("DATABASE_URL host:", new URL(process.env.DATABASE_URL).host);
}
console.log("DB_URL exists?", !!process.env.DB_URL);
if (process.env.DB_URL) {
    console.log("DB_URL host:", new URL(process.env.DB_URL).host);
}

const pool = require('./db');

const { sendRsvpConfirmationSms } = require("./twilio");

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

function normalizePhoneNumber(phone) {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');

    // If already starts with country code
    if(digits.length === 11 && digits.startsWith('1')) {
        return `+${digits}`;
    }

    // if 10-digit U.S. number, add +1
    if(digits.length === 10) {
        return `+1${digits}`;
    }

    // If number format is invalid
    return null;
}

// RSVP Handler
app.post('/api/rsvp', async (req, res) => {
    const { name, phone, attending, dinner, individualAttendance } = req.body;

    const phoneRegex = /^(\+1\s?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
    
    const normalizePhone = normalizePhoneNumber(phone);

    const isAttending = attending === 'yes' ? true :
                        attending === 'no' ? false :
                        null;
    
    const isAttendingDinner =   dinner === "yes" ? true :
                                dinner === "no" ? false :
                                null;
    
    if (!name || !phone || !attending) {
        return res.status(400).json({ error:'MISSING_FIELDS' });
    }

    if (!normalizePhone) {
        return res.status(400).json({ error: "PHONE_INVALID" });
    }
    
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'PHONE_FORMAT' });
    }
    
    if (!individualAttendance || typeof individualAttendance !== 'object') {
        return res.status(400).json({ error: 'INDIVIDUAL_INVALID' });
    }

    if (isAttending === null) {
        return res.status(400).json({ error: "ATTENDING_INVALID" });
    }

    if (isAttending && isAttendingDinner === null) {
        return res.status(400).json({ error: "DINNER_INVALID" });
    }

    // Validate that every guest has a response
    const allValid = Object.values(individualAttendance).every(
        (val) =>
        (val.rsvp === 'yes' || val.rsvp === 'no' ) &&
        (val.rsvp === 'no' || (val.dinner === 'yes' || val.dinner === 'no'))
    );

    if (!allValid) {
        return res.status(400).json({ error: 'PARTY_INCOMPLETE' });
    }

    try {
        // Search database for main guest
        const guestResult = await pool.query(
            `SELECT * FROM guests WHERE LOWER(name) = LOWER($1)`,
            [name.trim()]
        );

        if (guestResult.rows.length === 0) {
            return res.status(400).json({ error: "GUEST_NOT_FOUND_DB" });
        }

        const guest = guestResult.rows[0];

        // Updata the phone in the guest table
        await pool.query(
            `UPDATE guests SET phone = $1 WHERE id = $2`,
            [normalizePhone, guest.id]
        );

        // Check for existing RSVP
        const rsvpResult = await pool.query(
            `SELECT id FROM rsvps WHERE guest_id = $1`,
            [guest.id]
        );

        const jsonAttendance = JSON.stringify(individualAttendance);

        if (rsvpResult.rows.length > 0) {
            // Update RSVP info
            await pool.query(
                `UPDATE rsvps
                SET attending = $1, dinner = $2, individual_Attendance = $3, timestamp = CURRENT_TIMESTAMP
                WHERE guest_id = $4`,
                [isAttending, isAttendingDinner, jsonAttendance, guest.id]
            );
        } else {
            // Insert into a new RSVP
            await pool.query(
                `INSERT INTO rsvps
                (guest_id, attending, dinner, individual_Attendance)
                VALUES ($1, $2, $3, $4)`,
                [guest.id, isAttending, isAttendingDinner, jsonAttendance]
            ); 
        }

        //Twilio
        try {
            await sendRsvpConfirmationSms({
                to: normalizePhone,
                name: name.trim(),
                language: req.body.language,
            });
            console.log("Confirmation SMS sent");
        } catch (smsErr) {
            console.error("Twilio SMS failed:", smsErr?.message || smsErr);
        }

        return res.status(200).json({ message: "RSVP received!" });

    } catch (err) {
        console.error("Error handling RSVP:", err.stack || err);
        return res.status(500).json({ error: 'RSVP_SAVE_FAILED'});
    }
});

// Guest Check for valid RSVP
app.post('/api/guest-check', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'NAME_REQUIRED' });
    }

    try {
        // Locate guest by name
        const guestResult = await pool.query(
            'SELECT * FROM guests WHERE LOWER(name) = LOWER($1)',
            [name]
        );

        if (guestResult.rows.length === 0) {
            return res.status(404).json({ error: 'GUEST_NOT_FOUND' });
        }

        const mainGuest = guestResult.rows[0];

        // Retrieve houshold members
        const householdResult = await pool.query(
            'SELECT name FROM guests WHERE household_id = $1',
            [mainGuest.id]
        );

        // Combine guest and houshold into one list if the guest is not a solo RSVP
        let householdGuests;

        if (householdResult.rows.length === 0){
            //Solo RSVP
            householdGuests = [];
        } else {
            //Main RSVP + Household members
            const householdNames = householdResult.rows.map(row => row.name);

            // Add the Main Guest to the list only if they're not already included
            householdGuests = householdNames.includes(mainGuest.name) ? householdNames : [mainGuest.name, ...householdNames];
        }

        // Check for existing RSVP
        const rsvpResult = await pool.query(
            'SELECT * FROM rsvps WHERE guest_id = $1',
            [mainGuest.id]
        );

        const existing = rsvpResult.rows.length > 0 ? { ...rsvpResult.rows[0], phone: mainGuest.phone } : null;

        return res.status(200).json({
            success:true,
            guests: householdGuests,
            existing
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
            FROM rsvps r
            JOIN guests g ON r.guest_id = g.id
        `);

        const data = result.rows.map(row => ({
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
        console.error("Admin RSVP fetch error:", err.stack || err);
        return res.status(500).json({ error: 'Failed to fetch RSVPs '});
    }
});

// Admin RSVP Deletion
app.delete('/api/admin/rsvp/:id', async (req, res) => {
    const rsvpId = req.params.id;

    try {
        const result = await pool.query(`
            DELETE FROM rsvps WHERE id = $1 RETURNING *`,
            [rsvpId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'RSVP not found' });
        }

        res.json({ message: 'RSVP deleted successfully' });
        
    } catch (err) {
        console.error("Error deleting RSVP:", err);
        res.status(500).json({ error: 'Failed to delete RSVP' });
    }
});

// Admin RSVP Edit
app.put('/api/admin/rsvps/:id', async (req, res) => {
    const { id } = req.params;
    const { phone, attending, dinner, contacted, notes } = req.body;

    try {
        // Update the phone number
        await pool.query(`
            UPDATE guests
            SET phone = $1
            WHERE id = (SELECT guest_id FROM rsvps WHERE id = $2)
            `,
            [phone, id]
        );

        // Update RSVP data
        await pool.query(`
            UPDATE rsvps
            SET attending = $1, dinner = $2, timestamp = CURRENT_TIMESTAMP, contacted = $3, notes = $4
            WHERE id = $5
            `,
            [attending, dinner, contacted, notes, id]
        );
        
        return res.status(200).json({ message: "RSVP Updated" });
    } catch (err) {
        console.error("Edit RSVP error:", err.stack || err);
        return res.status(500).json({ error: "Server error during update" });
    }
});

app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
});
