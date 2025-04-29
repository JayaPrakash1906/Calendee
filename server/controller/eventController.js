const {CreateEventModel, FetchEventsModel, UpdateEventsModel, DeleteEventModel}  = require('../model/eventModel');
const EmailValid = require('../Validation/EmailValid');
const PhoneNumberValid = require('../Validation/PhoneNumberValid');

const CreateEvents = async(req, res) => {
    const {name, meeting_name, start_time, end_time, purpose, contact_number, email, team_category, team_sub_category, other_option, room_type} = req.body;
    
    if (!name || !meeting_name || !start_time || !end_time || !purpose || !contact_number || !email || !team_category || !room_type) {
        return res.status(400).json({status: 'Check all fields'});
    }
    else if (!EmailValid(email)) {
        return res.status(422).json({Request: "Not a valid email"});
    }
    else if (!PhoneNumberValid(contact_number)) {
        return res.status(403).json({Request: "Not a valid Phone number"});
    }
    else {
        try {
            const result = await CreateEventModel(name, meeting_name, start_time, end_time, purpose, contact_number, email, team_category, team_sub_category, other_option, room_type);
            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json({status: 'Internal Server Error'});
        }
    }
};

const FetchEvents = async(req, res) => {
    try {
        const result = await FetchEventsModel();  
        return res.status(200).json(result);
    } catch(err) {
        console.error(err);
        return res.status(500).json({status: 'Internal Server Error'});
    }
};

const UpdateEvents = async (req, res) => {  
    const email = req.params.id;
    
    if (!email) {
        return res.status(400).json({ error: "Params missing" });
    }
    
    try {
        const { name, meeting_name, start_time, end_time, purpose, contact_number, team_category, team_sub_category, room_type } = req.body;
    
        if (!name || !meeting_name || !start_time || !end_time || !purpose || !contact_number || !team_category || !team_sub_category || !room_type) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        const result = await UpdateEventsModel(name, meeting_name, start_time, end_time, purpose, contact_number, team_category, team_sub_category, room_type, email);
        
    
        return res.status(200).json({ message: "Event updated successfully", data: result });
    } catch (err) {
        console.error("Error updating event:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const DeleteEvents = async (req, res) => {
    const email = req.params.id;  

    if (!email) {
        return res.status(400).json({ error: "Params missing" });  
    }

    try {
        const result = await DeleteEventModel(email);  
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message }); 
    }
};

module.exports = { CreateEvents, FetchEvents, UpdateEvents, DeleteEvents };




























































// const {CreateEventModel, FetchEventsModel, UpdateEventsModel, DeleteEventModel}  = require('../model/eventModel');
// const EmailValid = require('../Validation/EmailValid');
// const PhoneNumberValid = require('../Validation/PhoneNumberValid');

// const CreateEvents = async(req, res) =>{
//     const {name, meeting_name,  start_time, end_time, purpose, contact_number, email, team_category, team_sub_category, other_option} = req.body;
//     if(!name || !meeting_name || !start_time || !end_time || !purpose || !contact_number || !email || !team_category, !team_sub_category ) 
//     {
//         res.status(400).json({status: 'Check all fields'})
//     }
//     else if(!EmailValid(email))
//         {
//             res.status(422).json({Request: "Not a valid email"})
//         }
//         else if(!PhoneNumberValid(contact_number))
//             {
//                 res.status(403).json({Request: "Not a valid Phone number"})
//             }
//     else 
//     {
//         try
//         {
//             const result = await CreateEventModel(name, meeting_name, start_time, end_time, purpose, contact_number, email, team_category, team_sub_category, other_option);
//             res.status(201).json(result);
//         }
//         catch(err) 
//         {
//             res.status(500).json({status: 'Internal Server Error'});
//             //console.log(err);
//         }
//     }
// }

// const FetchEvents = async(req, res) => {
//   try 
//   {
//       const result = await FetchEventsModel();  
//       res.status(200).json(result);
//   }
//   catch(err)
//   {
//       console.log(err);
//   }
// }

// const UpdateEvents = async (req, res) => {  
//     const  email  = req.params.id;
//     if (!email) {
//       return res.status(400).json({ error: "Params missing" });
        
//     }
//     else{
//         try {
//             const { name, meeting_name, start_time, end_time, purpose, contact_number, team_category, team_sub_category } = req.body;
        
//           if (!name || !meeting_name || !start_time || !end_time || !purpose || !contact_number || !team_category || !team_sub_category ) {
//             return res.status(400).json({ error: "All fields are required" });
//             //console.log(err);
//           }
      
//           const result = await UpdateEventsModel(name, meeting_name, start_time, end_time, purpose, contact_number, team_category, team_sub_category,  email);
      
//           return res.status(200).json({ message: "Event updated successfully", data: result });
//         } catch (err) {
//           console.error("Error updating event:", err);
//           return res.status(500).json({ error: "Internal Server Error" });
//         }
//     }
//     // try {
//     //     const { name, meeting_name, start_time, end_time, purpose, contact_number, team_category, team_sub_category, other_option,  } = req.body;
    
//     //   if (!name || !meeting_name || !start_time || !end_time || !purpose || !contact_number || !team_category || !team_sub_category || !other_option ||) {
//     //     return res.status(400).json({ error: "All fields are required" });
//     //   }
  
//     //   const result = await UpdateEventsModel(name, meeting_name, start_time, end_time, purpose, contact_number, team_category, team_sub_category, other_option, email);
  
//     //   return res.status(200).json({ message: "Event updated successfully", data: result });
//     // } catch (err) {
//     //   console.error("Error updating event:", err);
//     //   return res.status(500).json({ error: "Internal Server Error" });
//     // }
//   };

//   const DeleteEvents = async (req, res) => {
//     const email = req.params.id;  

//     if (!email) {
//         return res.status(400).json({ error: "Params missing" });  
//     }

//     try {
//         const result = await DeleteEventModel(email);  
//         return res.status(200).json(result);
//     } catch (err) {
//         return res.status(500).json({ error: err.message }); 
//     }
// };
  

// module.exports = {CreateEvents, FetchEvents, UpdateEvents, DeleteEvents};
