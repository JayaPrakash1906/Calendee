const {CreateEventModel, FetchEventsModel, UpdateEventsModel, DeleteEventModel}  = require('../model/eventModel');

const CreateEvents = async(req, res) =>{
    const {name, meeting_name,  start_time, end_time, purpose, contact_number, email, team_category, team_sub_category, other_option} = req.body;
    if(!name || !meeting_name || !start_time || !end_time || !purpose || !contact_number || !email || !team_category, !team_sub_category ) 
    {
        res.status(400).json({status: 'Check all fields'})
    }
    else 
    {
        try
        {
            const result = await CreateEventModel(name, meeting_name, start_time, end_time, purpose, contact_number, email, team_category, team_sub_category, other_option);
            res.status(201).json(result);
        }
        catch(err) 
        {
            res.status(500).json({status: 'Internal Server Error'});
            console.log(err);
        }
    }
}

const FetchEvents = async(req, res) => {
  try 
  {
      const result = await FetchEventsModel();  
      res.status(200).json(result);
  }
  catch(err)
  {
      console.log(err);
  }
}

const UpdateEvents = async (req, res) => {
    try {
      const { name, meeting_name, start_time, end_time, purpose, contact_number, team_category, team_sub_category, other_option, email } = req.body;
  
      if (!name || !meeting_name || !start_time || !end_time || !purpose || !contact_number || !team_category || !team_sub_category || !other_option || !email) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const result = await UpdateEventsModel(name, meeting_name, start_time, end_time, purpose, contact_number, team_category, team_sub_category, other_option, email);
  
      return res.status(200).json({ message: "Event updated successfully", data: result });
    } catch (err) {
      console.error("Error updating event:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const DeleteEvents = async (req, res) => {
    const email = req.params.id;  // Extract email from params

    if (!email) {
        return res.status(400).json({ error: "Params missing" });  // 400 Bad Request
    }

    try {
        const result = await DeleteEventModel(email);  // Correct function name
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });  // 500 Internal Server Error
    }
};
  

module.exports = {CreateEvents, FetchEvents, UpdateEvents, DeleteEvents};