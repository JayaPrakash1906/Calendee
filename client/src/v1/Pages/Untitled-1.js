// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import Modal from 'react-modal';
// import SideBar from '../Components/SideBar';
// import NavBar from '../Components/NavBar';
// import axios from 'axios';

// const localizer = momentLocalizer(moment);

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: '600px',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     backgroundColor: 'white',
//     border: '1px solid #e5e7eb',
//     zIndex: 1050,
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 1040,
//   },
// };

// const CalendarView = () => {
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState({ start: null, end: null });
//   const [formData, setFormData] = useState({
//     name: '',
//     meeting_name: '',
//     start_time: '',
//     end_time: '',
//     purpose: '',
//     contact_number: '',
//     email: '',
//     team_category: '',
//     team_sub_category: ''
//   });

//   const handleSelectSlot = (slotInfo) => {
//     const startTime = moment(slotInfo.start).format('YYYY-MM-DDTHH:mm');
//     const endTime = moment(slotInfo.end).format('YYYY-MM-DDTHH:mm');
//     setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
//     setFormData(prev => ({
//       ...prev,
//       start_time: startTime,
//       end_time: endTime
//     }));
//     setIsOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         start_time: new Date(formData.start_time),
//         end_time: new Date(formData.end_time),
//       };
//       await axios.post('http://localhost:3002/api/create', payload);
//       setIsOpen(false);
//       setFormData({
//         name: '',
//         meeting_name: '',
//         start_time: '',
//         end_time: '',
//         purpose: '',
//         contact_number: '',
//         email: '',
//         team_category: '',
//         team_sub_category: ''
//       });
//     } catch (error) {
//       console.error('Error submitting meeting:', error);
//       alert('Failed to create meeting. Please try again.');
//     }
//   };

//   return (
//     <div className="flex">
//       <div className="bg-[#1D2753]">
//         <SideBar />
//       </div>
//       <div className="ms-[69px] flex-grow">
//         <NavBar />
//         <div className="p-4">
//           <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
//           <Calendar
//             localizer={localizer}
//             startAccessor="start"
//             endAccessor="end"
//             selectable
//             onSelectSlot={handleSelectSlot}
//             views={['month', 'week', 'day']}
//             defaultView="month"
//             style={{ height: 500, zIndex: 1 }}
//           />
//           <Modal
//             isOpen={modalIsOpen}
//             onRequestClose={() => setIsOpen(false)}
//             style={customStyles}
//             contentLabel="Add Meeting"
//             ariaHideApp={false}
//           >
//             <h2 className="text-xl font-bold mb-4">Add Meeting</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Meeting Name</label>
//                   <input
//                     type="text"
//                     name="meeting_name"
//                     value={formData.meeting_name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter meeting name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Start Time</label>
//                   <input
//                     type="datetime-local"
//                     name="start_time"
//                     value={formData.start_time}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">End Time</label>
//                   <input
//                     type="datetime-local"
//                     name="end_time"
//                     value={formData.end_time}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>

//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium mb-1">Purpose</label>
//                   <textarea
//                     name="purpose"
//                     value={formData.purpose}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded resize-none"
//                     rows="3"
//                     placeholder="Enter meeting purpose"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Contact Number</label>
//                   <input
//                     type="tel"
//                     name="contact_number"
//                     value={formData.contact_number}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter contact number"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Email ID</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter email ID"
//                     required
//                   />
//                 </div>

//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium mb-1">
//                     Team/Company/Office/Clubs
//                   </label>
//                   <select
//                     name="team_category"
//                     value={formData.team_category}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded mb-2"
//                     required
//                   >
//                     <option value="" disabled>Select an option</option>
//                     <option value="cfi_clubs">CFI Clubs</option>
//                     <option value="cfi_teams">CFI Teams</option>
//                     <option value="nirmaan">Nirmaan</option>
//                     <option value="gdc">GDC</option>
//                     <option value="iitmaa">IIT Madras Alumni Association</option>
//                     <option value="global_engagement">Global Engagement</option>
//                     <option value="others">Others</option>
//                   </select>

//                   {['cfi_clubs', 'cfi_teams', 'nirmaan'].includes(formData.team_category) && (
//                     <select
//                       name="team_sub_category"
//                       value={formData.team_sub_category}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded mb-2"
//                       required
//                     >
//                       <option value="" disabled>Select a subcategory</option>
//                       {formData.team_category === 'cfi_clubs' && (
//                         <>
//                           <option value="3D Printing Club">3D Printing Club</option>
//                           <option value="Aero Club">Aero Club</option>
//                           <option value="Electronics Club">Electronics Club</option>
//                           <option value="Horizon">Horizon</option>
//                           <option value="iBot Club">iBot Club</option>
//                          <option value="Product Design Club">Product Design Club</option>
//                          <option value="Programming Club">Programming Club</option>
//                          <option value="Team Sahaay">Team Sahaay</option>
//                          <option value="Team Envisage">Team Envisage</option>
//                          <option value="Webops and Blockchain">Webops and Blockchain</option>
//                          <option value="AI Club">AI Club</option>
//                          <option value="Biotech Club">Biotech Club</option>
//                           <option value="Mathematics Club">Mathematics Club</option>
//                           <option value="Cybersecurity Club">Cybersecurity Club</option>
//                         </>
//                       )}
//                       {formData.team_category === 'cfi_teams' && (
//                         <>
//                           <option value="Raftar Formula Racing">Raftar Formula Racing</option>
//                           <option value="Team Abhiyaan">Team Abhiyaan</option>
//                           <option value="Team Anveshak">Team Anveshak</option>
//                           <option value="Team Avishkar Hyperloop">Team Avishkar Hyperloop</option>
//                           <option value="Team Agnirath">Team Agnirath</option>
//                           <option value="Team Abhyuday">Team Abhyuday</option>
//                           <option value="IGEM">IGEM</option>
//                           <option value="Amogh">Amogh</option>
//                         </>
//                       )}
//                       {formData.team_category === 'nirmaan' && (
//                         <>
//                           <option value="Somfin">Somfin</option>
//                           <option value="Electra Wheeler">Electra Wheeler</option>
//                           <option value="Tarang">Tarang</option>
//                         <option value="Machintell Corp">Machintell Corp</option>
//                         <option value="Teraclime">Teraclime</option>
//                          <option value="plenome">plenome</option>
//                        <option value="Krishaka"></option>
//                          <option value="kendal">kendal</option>
//                         <option value="Ewebstore">Ewebstore</option>
//                         </>
//                       )}
//                     </select>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Send Request
//                 </button>
//               </div>
//             </form>
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarView;



























// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import Modal from 'react-modal';
// import SideBar from '../Components/SideBar';
// import NavBar from '../Components/NavBar';
// import axios from 'axios';

// const localizer = momentLocalizer(moment);

// // ... (customStyles remains the same)
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: '600px',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     backgroundColor: 'white',
//     border: '1px solid #e5e7eb',
//     zIndex: 1050,
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 1040,
//   },
// };

// const CalendarView = () => {
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState({ start: null, end: null });
//   const [formData, setFormData] = useState({
//     name: '',
//     meeting_name: '',
//     start_time: '',
//     end_time: '',
//     purpose: '',
//     contact_number: '',
//     email: '',
//     team_category: '',
//     team_sub_category: '' // Fixed typo here
//   });
//   console.log(formData);

//   const handleSelectSlot = (slotInfo) => {
//     const startTime = moment(slotInfo.start).format('YYYY-MM-DDTHH:mm');
//     const endTime = moment(slotInfo.end).format('YYYY-MM-DDTHH:mm');
//     setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
//     setFormData(prev => ({
//       ...prev,
//       start_time: startTime,
//       end_time: endTime
//     }));
//     setIsOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         start: new Date(formData.start_time),
//         end: new Date(formData.end_time),
//       };
//       await axios.post('http://localhost:3002/api/create', payload);
//       setIsOpen(false);
//       // Reset form or handle success
//     } catch (error) {
//       console.error('Error submitting meeting:', error);
//     }
//   };

//   return (
//     <div className="flex">
//       <div className="bg-[#1D2753]">
//         <SideBar />
//       </div>
//       <div className="ms-[69px] flex-grow">
//         <NavBar />
//         <div className="p-4">
//           <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
//           <Calendar
//             localizer={localizer}
//             startAccessor="start"
//             endAccessor="end"
//             selectable
//             onSelectSlot={handleSelectSlot}
//             views={['month', 'week', 'day']}
//             defaultView="month"
//             style={{ height: 500, zIndex: 1 }}
//           />
//           <Modal
//             isOpen={modalIsOpen}
//             onRequestClose={() => setIsOpen(false)}
//             style={customStyles}
//             contentLabel="Add Meeting"
//           >
//             <h2 className="text-xl font-bold mb-4">Add Meeting</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-2 gap-4">
//                 {/* Name Field */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>

//                 {/* Meeting Name Field */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Meeting Name</label>
//                   <input
//                     type="text"
//                     name="meeting_name"
//                     value={formData.meeting_name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter meeting name"
//                     required
//                   />
//                 </div>

//                 {/* Start Time Field */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Start Time</label>
//                   <input
//                     type="datetime-local"
//                     name="start_time"
//                     value={formData.start_time}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>

//                 {/* End Time Field */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">End Time</label>
//                   <input
//                     type="datetime-local"
//                     name="end_time"
//                     value={formData.end_time}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>

//                 {/* Purpose Field */}
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium mb-1">Purpose</label>
//                   <textarea
//                     name="purpose"
//                     value={formData.purpose}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded resize-none"
//                     rows="3"
//                     placeholder="Enter meeting purpose"
//                     required
//                   />
//                 </div>

//                 {/* Contact Number Field */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Contact Number</label>
//                   <input
//                     type="tel"
//                     name="contact_number"
//                     value={formData.contact_number}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter contact number"
//                     required
//                   />
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Email ID</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter email ID"
//                     required
//                   />
//                 </div>

//                 {/* Team Category Dropdown */}
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium mb-1">
//                     Team/Company/Office/Clubs
//                   </label>
//                   <select
//                     name="team_category"
//                     value={formData.team_category}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded mb-2"
//                     required
//                   >
//                     <option value="" disabled>Select an option</option>
//                     <option value="cfi_clubs">CFI Clubs</option>
//                     <option value="cfi_teams">CFI Teams</option>
//                     <option value="nirmaan">Nirmaan</option>
//                     <option value="gdc">GDC</option>
//                     <option value="iitmaa">IIT Madras Alumni Association</option>
//                     <option value="global_engagement">Global Engagement</option>
//                     <option value="others">Others</option>
//                   </select>

//                   {/* Subcategory Dropdown */}
//                   {['cfi_clubs', 'cfi_teams', 'nirmaan'].includes(formData.team_category) && (
//                     <select
//                       name="team_sub_category"
//                       value={formData.team_sub_category}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded mb-2"
//                       required
//                     >
//                       <option value="" disabled>Select a subcategory</option>
//                       {formData.team_category === 'cfi_clubs' && (
//                         <>
//                           <option value="3D Printing Club">3D Printing Club</option>
//                           <option value="Aero Club">Aero Club</option>
//                           <option value="Electronics Club">Electronics Club</option>
//                           <option value="Horizon">Horizon</option>
//                           <option value="iBot Club">iBot Club</option>
//                           <option value="Product Design Club">Product Design Club</option>
//                           <option value="Programming Club">Programming Club</option>
//                           <option value="Team Sahaay">Team Sahaay</option>
//                           <option value="Team Envisage">Team Envisage</option>
//                           <option value="Webops and Blockchain">Webops and Blockchain</option>
//                           <option value="AI Club">AI Club</option>
//                           <option value="Biotech Club">Biotech Club</option>
//                           <option value="Mathematics Club">Mathematics Club</option>
//                           <option value="Cybersecurity Club">Cybersecurity Club</option>
//                         </>
//                       )}
//                       {formData.team_category === 'cfi_teams' && (
//                         <>
//                           <option value="Raftar Formula Racing">Raftar Formula Racing</option>
//                           <option value="Team Abhiyaan">Team Abhiyaan</option>
//                           <option value="Team Anveshak">Team Anveshak</option>
//                           <option value="Team Avishkar Hyperloop">Team Avishkar Hyperloop</option>
//                           <option value="Team Agnirath">Team Agnirath</option>
//                           <option value="Team Abhyuday">Team Abhyuday</option>
//                           <option value="IGEM">IGEM</option>
//                           <option value="Amogh">Amogh</option>
//                         </>
//                       )}
//                       {formData.team_category === 'nirmaan' && (
//                         <>
//                           <option value="Somfin">Somfin</option>
//                           <option value="Electra Wheeler">Electra Wheeler</option>
//                           <option value="Tarang">Tarang</option>
//                           <option value="Machintell Corp">Machintell Corp</option>
//                           <option value="Teraclime">Teraclime</option>
//                           <option value="plenome">plenome</option>
//                           <option value="Krishaka"></option>
//                           <option value="kendal">kendal</option>
//                           <option value="Ewebstore">Ewebstore</option>
//                         </>
//                       )}
//                     </select>
//                   )}
//                 </div>
//               </div>

//               {/* Form Buttons */}
//               <div className="flex justify-end mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Send Request
//                 </button>
//               </div>
//             </form>
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarView;


















































// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import Modal from 'react-modal';

// const localizer = momentLocalizer(moment);
// Modal.setAppElement('#root');

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: '600px',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     backgroundColor: 'white',
//     border: '1px solid #e5e7eb',
//     zIndex: 1050,
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 1040,
//   },
// };

// const CalendarView = () => {
//   const [events, setEvents] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [name, setName] = useState('');
//   const [meetingName, setMeetingName] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [meetingPurpose, setMeetingPurpose] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [teamCategory, setTeamCategory] = useState('');
//   const [teamSubCategory, setTeamSubCategory] = useState('');
//   const [otherOption, setOtherOption] = useState('');

//   const options = {
//     team: ['3D Printing Club', 'Aero Club', 'Electronics Club', 'Horizon', 'iBot Club', 'Product Design Club', 'Programming Club', 'Team Sahaay', 'Team Envisage', 'Webops and Blockchain', 'AI Club', 'Biotech Club', 'Mathematics Club', 'Cybersecurity Club'],
//     teams: ['Raftar Formula Racing', 'Team Abhiyaan', 'Team Anveshak', 'Team Avishkar Hyperloop', 'Team Agnirath', 'Team Abhyuday', 'IGEM', 'Amogh'],
//     office: ['Somfin', 'Electra Wheeler', 'Tarang', 'Machintell Corp', 'Teraclime', 'plenome', 'Krishaka', 'kendal', 'inbound Aerospace', 'seat of joy', 'melango', 'mainto', 'Moon labs', 'runverve'],
//   };

//   // Fetch initial events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://localhost:3002/api/events');
//         const data = await response.json();
//         setEvents(data.map(event => ({
//           ...event,
//           start: new Date(event.start),
//           end: new Date(event.end),
//         })));
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleSelectSlot = (slotInfo) => {
//     setSelectedSlot(slotInfo);
//     setSelectedEvent(null);
//     setModalIsOpen(true);
//     clearForm();
//   };

//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setSelectedSlot({ start: event.start, end: event.end });
//     populateForm(event);
//     setModalIsOpen(true);
//   };

//   const populateForm = (event) => {
//     setName(event.name);
//     setMeetingName(event.title);
//     setStartTime(moment(event.start).format('HH:mm'));
//     setEndTime(moment(event.end).format('HH:mm'));
//     setMeetingPurpose(event.purpose);
//     setContactNumber(event.contactNumber);
//     setEmail(event.email);
    
//     // Parse team category and subcategory
//     if (event.team.includes(' - ')) {
//       const [category, subCategory] = event.team.split(' - ');
//       setTeamCategory(category);
//       setTeamSubCategory(subCategory);
//     } else {
//       setTeamCategory(event.team);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation logic
//     if (!validateForm()) return;

//     // Date/time parsing
//     const startDate = new Date(`${selectedSlot.start.toDateString()} ${startTime}`);
//     const endDate = new Date(`${selectedSlot.start.toDateString()} ${endTime}`);

//     // Form data construction
//     const formData = {
//       name,
//       meeting_name: meetingName,
//       start_time: startDate.toISOString(),
//       end_time: endDate.toISOString(),
//       purpose: meetingPurpose,
//       contact_number: contactNumber,
//       email,
//       team_category: teamCategory,
//       team_sub_category: teamCategory === 'others' ? otherOption : teamSubCategory,
//     };

//     try {
//       let response;
//       if (selectedEvent) {
//         // Update existing event (PUT)
//         response = await fetch(`http://localhost:3002/api/update/${selectedEvent.id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });
//       } else {
//         // Create new event (POST)
//         response = await fetch('http://localhost:3002/api/create', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });
//       }

//       if (!response.ok) throw new Error('Request failed');

//       // Update events state
//       const newEvent = {
//         id: selectedEvent?.id || Date.now(),
//         title: meetingName,
//         start: startDate,
//         end: endDate,
//         purpose: meetingPurpose,
//         contactNumber,
//         email,
//         team: teamCategory === 'others' 
//           ? otherOption 
//           : teamCategory !== 'gdc' && teamCategory !== 'iitmaa' && teamCategory !== 'global_engagement' 
//             ? `${teamCategory} - ${teamSubCategory}` 
//             : teamCategory,
//       };

//       setEvents(prevEvents => {
//         if (selectedEvent) {
//           return prevEvents.map(event => 
//             event.id === selectedEvent.id ? newEvent : event
//           );
//         }
//         return [...prevEvents, newEvent];
//       });

//       setModalIsOpen(false);
//       clearForm();
//       alert(`Meeting request ${selectedEvent ? 'updated' : 'submitted'} successfully!`);
//     } catch (error) {
//       console.error('Submission error:', error);
//       alert(`Failed to ${selectedEvent ? 'update' : 'submit'} meeting request. Please try again.`);
//     }
//   };

//   const validateForm = () => {
//     if (!name || !meetingName || !startTime || !endTime || !meetingPurpose || !contactNumber || !email || !teamCategory) {
//       alert('Please fill out all required fields.');
//       return false;
//     }

//     if (teamCategory === 'others' && !otherOption) {
//       alert('Please specify the "Other" option.');
//       return false;
//     }

//     const categoriesRequiringSubcategory = ['team', 'teams', 'office'];
//     if (categoriesRequiringSubcategory.includes(teamCategory) && !teamSubCategory) {
//       alert(`Please select a subcategory for ${teamCategory}.`);
//       return false;
//     }

//     return true;
//   };

//   const clearForm = () => {
//     setName('');
//     setMeetingName('');
//     setStartTime('');
//     setEndTime('');
//     setMeetingPurpose('');
//     setContactNumber('');
//     setEmail('');
//     setTeamCategory('');
//     setTeamSubCategory('');
//     setOtherOption('');
//     setSelectedEvent(null);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         selectable
//         onSelectSlot={handleSelectSlot}
//         onSelectEvent={handleSelectEvent}
//         views={['month', 'week', 'day']}
//         defaultView="month"
//         style={{ height: 500, zIndex: 1 }}
//       />
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         style={customStyles}
//         contentLabel="Add Meeting"
//       >
//         <h2 className="text-xl font-bold mb-4">Add Meeting</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-4">
//             {/* Name and Meeting Name Fields */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Meeting Name</label>
//               <input
//                 type="text"
//                 value={meetingName}
//                 onChange={(e) => setMeetingName(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter meeting name"
//                 required
//               />
//             </div>

//             {/* Time Fields */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Start Time</label>
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">End Time</label>
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             {/* Purpose Field */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium mb-1">Purpose</label>
//               <textarea
//                 value={meetingPurpose}
//                 onChange={(e) => setMeetingPurpose(e.target.value)}
//                 className="w-full p-2 border rounded resize-none"
//                 rows="3"
//                 placeholder="Enter meeting purpose"
//                 required
//               />
//             </div>

//             {/* Contact Information */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Contact Number</label>
//               <input
//                 type="tel"
//                 value={contactNumber}
//                 onChange={(e) => setContactNumber(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter contact number"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email ID</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter email ID"
//                 required
//               />
//             </div>

//             {/* Team/Category Selection */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium mb-1">
//                 Team/Company/Office/Clubs
//               </label>
//               <select
//                 value={teamCategory}
//                 onChange={(e) => {
//                   setTeamCategory(e.target.value);
//                   setTeamSubCategory('');
//                 }}
//                 className="w-full p-2 border rounded mb-2"
//                 required
//               >
//                 <option value="" disabled>Select an option</option>
//                 <option value="team">CFI Clubs</option>
//                 <option value="teams">CFI Teams</option>
//                 <option value="office">Nirmaan</option>
//                 <option value="gdc">GDC</option>
//                 <option value="iitmaa">IIT Madras Alumni Association</option>
//                 <option value="global_engagement">Global Engagement</option>
//                 <option value="others">Others</option>
//               </select>

//               {/* Conditional Fields */}
//               {teamCategory && !['gdc', 'iitmaa', 'global_engagement'].includes(teamCategory) && (
//                 teamCategory === 'others' ? (
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Specify Other Option</label>
//                     <input
//                       type="text"
//                       value={otherOption}
//                       onChange={(e) => setOtherOption(e.target.value)}
//                       className="w-full p-2 border rounded"
//                       placeholder="Enter custom option"
//                       required
//                     />
//                   </div>
//                 ) : (
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Select {teamCategory}
//                     </label>
//                     <select
//                       value={teamSubCategory}
//                       onChange={(e) => setTeamSubCategory(e.target.value)}
//                       className="w-full p-2 border rounded"
//                       required
//                     >
//                       <option value="" disabled>Select a {teamCategory}</option>
//                       {options[teamCategory].map((option) => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Form Buttons */}
//           <div className="flex justify-end mt-4">
//             <button
//               type="button"
//               onClick={() => setModalIsOpen(false)}
//               className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Send Request
//             </button>
//           </div>
//         </form>
//       </Modal>
     
//     </div>
//   );
// };

// export default CalendarView;




































// // import React, { useState } from 'react';
// // import { Calendar, momentLocalizer } from 'react-big-calendar';
// // import moment from 'moment';
// // import 'react-big-calendar/lib/css/react-big-calendar.css';
// // import Modal from 'react-modal';
// // import axios from 'axios'; // Remove if using fetch

// // const localizer = momentLocalizer(moment);
// // Modal.setAppElement('#root');

// // const customStyles = {
// //   content: {
// //     top: '50%',
// //     left: '50%',
// //     right: 'auto',
// //     bottom: 'auto',
// //     marginRight: '-50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: '600px',
// //     padding: '20px',
// //     borderRadius: '8px',
// //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
// //     backgroundColor: 'white',
// //     border: '1px solid #e5e7eb',
// //     zIndex: 1050,
// //   },
// //   overlay: {
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     zIndex: 1040,
// //   },
// // };

// // const CalendarView = () => {
// //   const [events, setEvents] = useState([]);
// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //   const [selectedSlot, setSelectedSlot] = useState(null);
// //   const [name, setName] = useState('');
// //   const [meetingName, setMeetingName] = useState('');
// //   const [startTime, setStartTime] = useState('');
// //   const [endTime, setEndTime] = useState('');
// //   const [meetingPurpose, setMeetingPurpose] = useState('');
// //   const [contactNumber, setContactNumber] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [teamCategory, setTeamCategory] = useState('');
// //   const [teamSubCategory, setTeamSubCategory] = useState('');
// //   const [otherOption, setOtherOption] = useState('');

// //   const options = {
// //     team: ['3D Printing Club', 'Aero Club', 'Electronics Club', 'Horizon', 'iBot Club', 'Product Design Club', 'Programming Club', 'Team Sahaay', 'Team Envisage', 'Webops and Blockchain', 'AI Club', 'Biotech Club', 'Mathematics Club', 'Cybersecurity Club'],
// //     teams: ['Raftar Formula Racing', 'Team Abhiyaan', 'Team Anveshak', 'Team Avishkar Hyperloop', 'Team Agnirath', 'Team Abhyuday', 'IGEM', 'Amogh'],
// //     office: ['Somfin', 'Electra Wheeler', 'Tarang', 'Machintell Corp', 'Teraclime', 'plenome', 'Krishaka', 'kendal', 'inbound Aerospace', 'seat of joy', 'melango', 'mainto', 'Moon labs', 'runverve'],
// //   };

// //   const handleSelectSlot = (slotInfo) => {
// //     setSelectedSlot(slotInfo);
// //     setModalIsOpen(true);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Base validation for all required fields
// //     if (
// //       !name ||
// //       !meetingName ||
// //       !startTime ||
// //       !endTime ||
// //       !meetingPurpose ||
// //       !contactNumber ||
// //       !email ||
// //       !teamCategory
// //     ) {
// //       alert('Please fill out all required fields.');
// //       return;
// //     }

// //     // Additional validation for "others" category
// //     if (teamCategory === 'others' && !otherOption) {
// //       alert('Please specify the "Other" option.');
// //       return;
// //     }

// //     // Validation for categories requiring sub-category (team, teams, office)
// //     if (
// //       !['gdc', 'iitmaa', 'global_engagement', 'others'].includes(teamCategory) &&
// //       (!teamSubCategory || teamSubCategory === '')
// //     ) {
// //       alert(`Please select a subcategory for ${teamCategory}.`);
// //       return;
// //     }
    
// //     if (teamCategory === 'others' && (!otherOption || otherOption.trim() === '')) {
// //       alert('Please specify the "Other" option.');
// //       return;
// //     }

// //     // Date/time parsing
// //     const startDate = new Date(`${selectedSlot.start.toDateString()} ${startTime}`);
// //     const endDate = new Date(`${selectedSlot.start.toDateString()} ${endTime}`);

// //     // Form data construction
// //     const formData = {
// //       name,
// //       meeting_name: meetingName,
// //       start_time: startDate.toISOString(),
// //       end_time: endDate.toISOString(),
// //       purpose: meetingPurpose,
// //       contact_number: contactNumber,
// //       email,
// //       team_category: teamCategory,
// //       team_sub_category: teamSubCategory,
// //       other_option: teamCategory === 'others' ? otherOption : '',
// //     };

// //     try {
// //       const response = await fetch('http://localhost:3002/api/create', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });

// //       if (!response.ok) throw new Error('Request failed');

// //       // Create new event for calendar
// //       const newEvent = {
// //         title: meetingName,
// //         start: startDate,
// //         end: endDate,
// //         purpose: meetingPurpose,
// //         contactNumber,
// //         email,
// //         team: teamCategory === 'others'
// //           ? otherOption
// //           : ['gdc', 'iitmaa', 'global_engagement'].includes(teamCategory)
// //             ? teamCategory
// //             : `${teamCategory} - ${teamSubCategory}`,
// //       };

// //       // Update state and reset form
// //       setEvents([...events, newEvent]);
// //       setModalIsOpen(false);
// //       clearForm();
// //       alert('Meeting request submitted successfully!');
// //     } catch (error) {
// //       console.error('Submission error:', error);
// //       alert('Failed to submit meeting request. Please try again.');
// //     }
// //   };

// //   const clearForm = () => {
// //     setName('');
// //     setMeetingName('');
// //     setStartTime('');
// //     setEndTime('');
// //     setMeetingPurpose('');
// //     setContactNumber('');
// //     setEmail('');
// //     setTeamCategory('');
// //     setTeamSubCategory('');
// //     setOtherOption('');
// //   };

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
// //       <Calendar
// //         localizer={localizer}
// //         events={events}
// //         startAccessor="start"
// //         endAccessor="end"
// //         selectable
// //         onSelectSlot={handleSelectSlot}
// //         views={['month', 'week', 'day']}
// //         defaultView="month"
// //         style={{ height: 500, zIndex: 1 }}
// //       />


// //     </div>
// //   );
// // };

// // export default CalendarView;

// {/* <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         style={customStyles}
//         contentLabel="Add Meeting"
//       >
//         <h2 className="text-xl font-bold mb-4">Add Meeting</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-4">
//             {/* Name and Meeting Name Fields 
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Meeting Name</label>
//               <input
//                 type="text"
//                 value={meetingName}
//                 onChange={(e) => setMeetingName(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter meeting name"
//                 required
//               />
//             </div>

//             {/* Time Fields 
//             <div>
//               <label className="block text-sm font-medium mb-1">Start Time</label>
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">End Time</label>
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             {/* Purpose Field 
//             <div className="col-span-2">
//               <label className="block text-sm font-medium mb-1">Purpose</label>
//               <textarea
//                 value={meetingPurpose}
//                 onChange={(e) => setMeetingPurpose(e.target.value)}
//                 className="w-full p-2 border rounded resize-none"
//                 rows="3"
//                 placeholder="Enter meeting purpose"
//                 required
//               />
//             </div>

//             {/* Contact Information
//             <div>
//               <label className="block text-sm font-medium mb-1">Contact Number</label>
//               <input
//                 type="tel"
//                 value={contactNumber}
//                 onChange={(e) => setContactNumber(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter contact number"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email ID</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 placeholder="Enter email ID"
//                 required
//               />
//             </div>

//             {/* Team/Category Selection 
//             <div className="col-span-2">
//               <label className="block text-sm font-medium mb-1">
//                 Team/Company/Office/Clubs
//               </label>
//               <select
//                 value={teamCategory}
//                 onChange={(e) => {
//                   setTeamCategory(e.target.value);
//                   setTeamSubCategory('');
//                 }}
//                 className="w-full p-2 border rounded mb-2"
//                 required
//               >
//                 <option value="" disabled>Select an option</option>
//                 <option value="team">CFI Clubs</option>
//                 <option value="teams">CFI Teams</option>
//                 <option value="office">Nirmaan</option>
//                 <option value="gdc">GDC</option>
//                 <option value="iitmaa">IIT Madras Alumni Association</option>
//                 <option value="global_engagement">Global Engagement</option>
//                 <option value="others">Others</option>
//               </select>

//               {/* Conditional Fields 
//               {teamCategory && !['gdc', 'iitmaa', 'global_engagement'].includes(teamCategory) && (
//                 teamCategory === 'others' ? (
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Specify Other Option</label>
//                     <input
//                       type="text"
//                       value={otherOption}
//                       onChange={(e) => setOtherOption(e.target.value)}
//                       className="w-full p-2 border rounded"
//                       placeholder="Enter custom option"
//                       required
//                     />
//                   </div>
//                 ) : (
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Select {teamCategory}
//                     </label>
//                     <select
//                       value={teamSubCategory}
//                       onChange={(e) => setTeamSubCategory(e.target.value)}
//                       className="w-full p-2 border rounded"
//                       required
//                     >
//                       <option value="" disabled>Select a {teamCategory}</option>
//                       {options[teamCategory].map((option) => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Form Buttons 
//           <div className="flex justify-end mt-4">
//             <button
//               type="button"
//               onClick={() => setModalIsOpen(false)}
//               className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Send Request
//             </button>
//           </div>
//         </form>
//       </Modal> */}