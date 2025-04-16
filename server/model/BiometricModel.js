const pool = require('../config/db');

const CreateBiometricModel = async (fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent, student_mail_id) => {
  try {
    const result = await pool.query(`INSERT INTO biometric_requests (full_name, employee_id, department, contact_info, biometric_type, reason, access_duration, approved_by, access_location, consent, student_mail_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, 
      [ fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent, student_mail_id]);
    return result; 
  } catch (error) {
    throw error; 
  }
};
const FetchBiometricModel = () => {
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM biometric_requests',
          (err, result) => {
              if(err) {
                  reject(err);
              }
              else {
                  resolve(result)
              }
          }
      )
  })
}
const UpdateBiometricModel = async (fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent, student_mail_id) => {
  try {
    const query = `
      UPDATE biometric_requests 
      SET full_name=$1, employee_id=$2, department=$3, contact_info=$4, biometric_type=$5, reason=$6, access_duration=$7, approved_by=$8, accessLocation=$9, consent=$10, student_mail_id=$11 
      WHERE email=$12 RETURNING *`;
    
    const values = [fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent, email, student_mail_id];

    const result = await pool.query(query, values);
    return result.rows; 
  } catch (error) {
    throw error;
  }
};

const DeleteBiometricModel = (id) => {
  return new Promise((resolve, reject) => {
      pool.query('DELETE FROM biometric_requests WHERE contact_info = $1', [id], (err, result) => {
          if (err) {
              reject(err);
          } else {
              if (result.rowCount === 0) {  
                  resolve({ status: "No matching record found" });
              } else {
                  resolve({ status: `Deleted resume ${id}` });
                
              }
          }
      });
  });
};


module.exports = {CreateBiometricModel, FetchBiometricModel, UpdateBiometricModel, DeleteBiometricModel};







































































// const pool = require('../config/db');

// const BiometricModel = {
//   async getAllRequests() {
//     const result = await pool.query('SELECT * FROM biometric_requests');
//     return result.rows;
//   },

//   async createRequest(request) {
//     const {
//       fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation,consent,} = request;

//     const result = await pool.query(
//       'INSERT INTO biometric_requests (full_name, employee_id, department, contact_info, biometric_type, reason, access_duration, approved_by, access_location, consent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
//       [fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent]
          
//     );

//     return result.rows[0];
//   },
// };