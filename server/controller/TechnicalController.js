const {CreateTechnicalModel, FetchTechnicalModel,UpdateTechnicalModel,DeleteTechnicalModel}  = require('../model/TechnicalModel');

const CreateTechnical = async(req, res) =>{
    const {type, category,  urgency, location, title, description, filename} = req.body;
    if(!type || !category || !urgency || !location || !title || !description || !filename ) 
    {
        res.status(400).json({status: 'Check all fields'})
    }
    else 
    {
        try
        {
            const result = await CreateTechnicalModel(type, category, urgency, location, title, description, filename);
            res.status(201).json(result);
        }
        catch(err) 
        {
            res.status(500).json({status: 'Internal Server Error'});
            console.log(err);
        }
    }
}

const FetchTechnical = async(req, res) => {
  try 
  {
      const result = await FetchTechnicalModel();  
      res.status(200).json(result);
  }
  catch(err)
  {
      console.log(err);
  }
}

const UpdateTechnical = async (req, res) => {
  try {
    const { type, category, urgency, location, title, description, filename } = req.body;

    if (!type || !category || !urgency || !location || !title || !description || !filename ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await UpdateTechnicalModel(type, category, urgency, location, title, description, filename);

    return res.status(200).json({ message: "Technical Issue  updated successfully", data: result });
  } catch (err) {
    console.error("Error updating event:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteTechnical = async (req, res) => {
  const email = req.params.id;  // Extract email from params

  if (!email) {
      return res.status(400).json({ error: "Params missing" });  // 400 Bad Request
  }

  try {
      const result = await DeleteTechnicalModel(email);  // Correct function name
      return res.status(200).json(result);
  } catch (err) {
      return res.status(500).json({ error: err.message });  // 500 Internal Server Error
  }
};
module.exports = {CreateTechnical, FetchTechnical, UpdateTechnical, DeleteTechnical};