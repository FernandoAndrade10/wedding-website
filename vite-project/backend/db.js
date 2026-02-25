/* eslint-env node */
console.log("DB CONFIG USING DATABASE_URL?", !!process.env.DATABASE_URL);
console.log("DB CONFIG URL PREFIX:", (process.env.DATABASE_URL || "").slice(0, 20));

const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing. Set it in Vercel Backend Env Vars.");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

module.exports = pool;