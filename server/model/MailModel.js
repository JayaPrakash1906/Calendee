const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'erp',
    password: 'root',
    port: 5432,
});

const createMailTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS mails (
            id SERIAL PRIMARY KEY,
            sender VARCHAR(100) NOT NULL,
            recipient VARCHAR(100) NOT NULL,
            subject VARCHAR(255),
            body TEXT,
            sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(queryText);
        console.log('Mail table created successfully');
    } catch (err) {
        console.error('Error creating mail table', err);
    }
};

const addMail = async (sender, recipient, subject, body) => {
    const queryText = `
        INSERT INTO mails (sender, recipient, subject, body)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [sender, recipient, subject, body];
    try {
        const res = await pool.query(queryText, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error adding mail', err);
    }
};

const getMails = async () => {
    const queryText = 'SELECT * FROM mails;';
    try {
        const res = await pool.query(queryText);
        return res.rows;
    } catch (err) {
        console.error('Error fetching mails', err);
    }
};

module.exports = {
    createMailTable,
    addMail,
    getMails,
};