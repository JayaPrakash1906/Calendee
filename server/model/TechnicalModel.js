// const pool = require('../config/db');

// const TechnicalModel = {
//   async getAllRequests() {
//     const result = await pool.query('SELECT * FROM technical_requests');
//     return result.rows;
//   },

//   async createRequest(request) {
//     const {
//       id, type, category, urgency, location, title, description, file_name, } = request;

//     const result = await pool.query(
//       'INSERT INTO technical_requests (id, type, category, urgency, location, title, description, file_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
//       [id, type, category, urgency, location, title, description, file_name]
          
//     );

//     return result.rows[0];
//   },
// };

// module.exports = TechnicalModel;





const pool = require('../config/db');

const CreateTechnicalModel = async (id, type, category, urgency, location, title, description, file_name) => {
  try {
    const result = await pool.query(`INSERT INTO technical_requests (id, type, category, urgency, location, title, description, file_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
      [ id, type, category, urgency, location, title, description, file_name]);
    return result; 
  } catch (error) {
    throw error; 
  }
};

const FetchTechnicalModel = () => {
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM technical_requests',
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

const UpdateTechnicalModel = async ( type, category, urgency, location, title, dscription, file_name, id) => {
  try {
    const query = `
      UPDATE technical_requests
      SET type=$1, category=$2, urgency=$3, location=$4, title=$5, description=$6, file_name=$7, id=$8,
      WHERE email=$10 RETURNING *`;
    
    const values = [type, category, urgency, location, title, dscription, file_name, id];

    const result = await pool.query(query, values);
    return result.rows; // Return the updated row
  } catch (error) {
    throw error;
  }
};

const DeleteTechnicalModel = (id) => {
  return new Promise((resolve, reject) => {
      pool.query('DELETE FROM meetings WHERE email = $1', [id], (err, result) => {
          if (err) {
              reject(err);
          } else {
              if (result.rowCount === 0) {  // If no rows were deleted
                  resolve({ status: "No matching record found" });
              } else {
                  resolve({ status: `Deleted resume ${id}` });
              }
          }
      });
  });
};

module.exports =  {CreateTechnicalModel, FetchTechnicalModel, UpdateTechnicalModel, DeleteTechnicalModel} ; 
