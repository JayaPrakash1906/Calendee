const {CreateBiometricModel, FetchBiometricModel, UpdateBiometricModel, DeleteBiometricModel}  = require('../model/BiometricModel');

const CreateBiometric = async(req, res) =>{
    const {fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation,consent} = req.body;
    if(!fullName || !employeeId || !department || !contactInfo || !biometricType || !reason || !accessDuration || !approvedBy || !accessLocation || !consent ) 
    {
        res.status(400).json({status: 'Check all fields'})
    }
    else 
    {
        try
        {
            const result = await CreateBiometricModel(fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent);
            res.status(201).json(result);
        }
        catch(err) 
        {
            res.status(500).json({status: 'Internal Server Error'});
            console.log(err);
        }
    }
}

const FetchBiometric = async(req, res) => {
  try 
  {
      const result = await FetchBiometricModel();  
      res.status(200).json(result);
  }
  catch(err)
  {
      console.log(err);
  }
}

const UpdateBiometric = async (req, res) => {
  try {
    const { fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent } = req.body;

    if (!fullName || !employeeId || !department || !contactInfo || !biometricType || !reason || !accessDuration || !approvedBy || !accessLocation || !consent) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await UpdateBiometricModel(fullName, employeeId, department, contactInfo, biometricType, reason, accessDuration, approvedBy, accessLocation, consent);

    return res.status(200).json({ message: "Event updated successfully", data: result });
  } catch (err) {
    console.error("Error updating event:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteBiometric = async (req, res) => {
  const contactInfo = req.params.id;  

  if (!contactInfo) {
      return res.status(400).json({ error: "Params missing" });  
  }

  try {
      const result = await DeleteBiometricModel(contactInfo);  
      return res.status(200).json(result);
  } catch (err) {
      return res.status(500).json({ error: err.message });  
      //console.log(err);
  }
};
module.exports = {CreateBiometric, FetchBiometric, UpdateBiometric, DeleteBiometric};

























































// const BiometricModel = require('../model/BiometricModel');

// const BiometricController = {
//   async getAllRequests(req, res) {
//     try {
//       const requests = await BiometricModel.getAllRequests();
//       res.json(requests);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching requests' });
//     }
//   },

//   async createRequest(req, res) {
//     try {
//       const newRequest = await BiometricModel.createRequest(req.body);
//       res.status(201).json(newRequest);
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating request' });
//     }lll;
//   },

// };

// module.exports = BiometricController;
