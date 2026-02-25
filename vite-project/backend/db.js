/* eslint-env node */
const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing. Set it in Vercel Backend Env Vars.");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

module.exports = pool;