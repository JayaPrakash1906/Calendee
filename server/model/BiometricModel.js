const pool = require('../config/db');

const BiometricModel = {
  async getAllRequests() {
    const result = await pool.query('SELECT * FROM biometric_requests');
    return result.rows;
  },

  async createRequest(request) {
    const {
      fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation,consent,} = request;

    const result = await pool.query(
      'INSERT INTO biometric_requests (full_name, employee_id, department, contact_info, biometric_type, reason, access_duration, approved_by, access_location, consent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent]
          
    );

    return result.rows[0];
  },
};





module.exports = BiometricModel;