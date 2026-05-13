/* eslint-env node */
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config();
const pool = require('../db');

const outputDir = path.join(__dirname, '..', 'backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

function csvEscape(value) {
    if (value === null || value === undefined) return '';

    const stringValue = String(value);
    if (/[",\n\r]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
}

function toCsv(rows) {
    const headers = ['id', 'name', 'phone', 'access_code', 'household_id', 'guest_type', 'primary_guest_name'];
    const lines = rows.map((row) => headers.map((header) => csvEscape(row[header])).join(','));

    return [headers.join(','), ...lines].join('\n');
}

function formatGuestRows(rows) {
    const primaryGuests = rows.filter((row) => row.household_id === null);

    return primaryGuests.map((primaryGuest) => ({
        id: primaryGuest.id,
        name: primaryGuest.name,
        phone: primaryGuest.phone,
        access_code: primaryGuest.access_code,
        guests: rows
            .filter((row) => row.household_id === primaryGuest.id)
            .map((member) => ({
                id: member.id,
                name: member.name,
                phone: member.phone,
            })),
    }));
}

async function main() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is required to export guests.');
    }

    fs.mkdirSync(outputDir, { recursive: true });

    const result = await pool.query(`
        SELECT
            guest.id,
            guest.name,
            guest.phone,
            guest.access_code,
            guest.household_id,
            CASE WHEN guest.household_id IS NULL THEN 'primary' ELSE 'household_member' END AS guest_type,
            primary_guest.name AS primary_guest_name
        FROM public.guests guest
        LEFT JOIN public.guests primary_guest ON primary_guest.id = guest.household_id
        ORDER BY COALESCE(primary_guest.name, guest.name), guest.household_id NULLS FIRST, guest.name
    `);

    const backup = {
        exported_at: new Date().toISOString(),
        total_rows: result.rows.length,
        households: formatGuestRows(result.rows),
        rows: result.rows,
    };

    const jsonPath = path.join(outputDir, `guest-backup-${timestamp}.json`);
    const csvPath = path.join(outputDir, `guest-backup-${timestamp}.csv`);

    fs.writeFileSync(jsonPath, `${JSON.stringify(backup, null, 2)}\n`, 'utf8');
    fs.writeFileSync(csvPath, `${toCsv(result.rows)}\n`, 'utf8');

    await pool.end();

    console.log(`Exported ${result.rows.length} guest rows.`);
    console.log(`JSON: ${jsonPath}`);
    console.log(`CSV: ${csvPath}`);
}

main().catch(async (err) => {
    console.error('Guest export failed:', err.message);
    await pool.end();
    process.exit(1);
});