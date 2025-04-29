const db = require('../config/db');

const Connection = {
  create: async (connectionData) => {
    const { name, designation, organisation, connect_for, contact_number, email_address } = connectionData;
    const query = `
      INSERT INTO connections (name, designation, organisation, connect_for, contact_number, email_address)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const values = [name, designation, organisation, connect_for, contact_number, email_address];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    const query = 'SELECT * FROM connections ORDER BY created_at DESC';
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  delete: async (email) => {
    const query = 'DELETE FROM connections WHERE email_address = $1 RETURNING *';
    try {
      const result = await db.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Connection;