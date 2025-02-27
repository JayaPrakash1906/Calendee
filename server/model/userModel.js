const pool = require('../config/db');

const UserModel = {
  async getAllUsers() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  },

  async getUserById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  },

  async createUser(name, email) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return rows[0];
  },

  async updateUser(id, name, email) {
    const { rows } = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return rows[0];
  },

  async deleteUser(id) {
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  },
};

module.exports = UserModel;