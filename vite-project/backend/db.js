/* eslint-env node */
/* eslint-env node */
const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 1,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000,
});

module.exports = pool;