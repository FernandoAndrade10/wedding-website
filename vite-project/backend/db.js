/* eslint-env node */
const pg = require("pg");
const { Pool } = pg;

function getConnectionString() {
    if (!process.env.DATABASE_URL) return process.env.DATABASE_URL;

    try {
        const databaseUrl = new URL(process.env.DATABASE_URL);

        databaseUrl.searchParams.delete('sslmode');
        databaseUrl.searchParams.delete('sslcert');
        databaseUrl.searchParams.delete('sslkey');
        databaseUrl.searchParams.delete('sslrootcert');
        databaseUrl.searchParams.delete('pgbouncer');

        return databaseUrl.toString();
    } catch {
        return process.env.DATABASE_URL;
    }
}


const pool = new Pool({
    connectionString: getConnectionString(),
    ssl: {
        rejectUnauthorized: false,
    },
    max: 1,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000,
});

module.exports = pool;