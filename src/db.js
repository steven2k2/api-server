const { Pool } = require('pg');

// Database connection pool
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'tyrell',
    password: process.env.POSTGRES_PASSWORD || 'dohickyBlah4',
    port: 5432, // Default PostgreSQL port
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};