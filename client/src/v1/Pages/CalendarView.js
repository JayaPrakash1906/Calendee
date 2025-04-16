import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import SideBar from '../Components/SideBar';
import NavBar from '../Components/NavBar';
import axios from 'axios';

// Configure moment locale
moment.locale('en', {
  week: { dow: 1 }, // Monday as first day of week
  longDateFormat: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
  }
});

const localizer = momentLocalizer(moment);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    zIndex: 1050,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1040,
  },
};

const CalendarView = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ start: null, end: null });
  const [formData, setFormData] = useState({
    name: '',
    meeting_name: '',
    start_time: '',
    end_time: '',
    purpose: '',
    contact_number: '',
    email: '',
    team_category: '',
    team_sub_category: '',
    room_type: '',
  });
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load from localStorage first for instant display
    const savedMeetings = localStorage.getItem('calendarMeetings');
    if (savedMeetings) {
      try {
        const parsedMeetings = JSON.parse(savedMeetings);
        setMeetings(parsedMeetings.map(meeting => ({
          ...meeting,
          start: new Date(meeting.start),
          end: new Date(meeting.end)
        })));
      } catch (e) {
        console.error('Failed to parse saved meetings', e);
      }
    }

    // Then fetch fresh data from API
    fetchMeetings();
  }, []);

  useEffect(() => {
    // Save to localStorage whenever meetings change
    if (meetings.length > 0) { 
      localStorage.setItem('calendarMeetings', JSON.stringify(meetings));
    }
  }, [meetings]);

  const fetchMeetings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3002/api/get');
      const formattedMeetings = response.data.map(meeting => ({
        ...meeting,
        title: `${meeting.meeting_name} (${meeting.room_type})`,
        start: new Date(meeting.start_time),
        end: new Date(meeting.end_time),
      }));
      setMeetings(formattedMeetings);
    } catch (error) {
      console.error('Failed to fetch meetings:', {  
        error: error.response?.data || error.message,
        status: error.response?.status
      });
      setError('Failed to load meetings. Using locally saved data.');
    } finally {
      setIsLoading(false);
    }
  };

  const isSlotAvailable = (start, end, room) => {
    const newStart = new Date(start);
    const newEnd = new Date(end);
    
    return !meetings.some(meeting => {
      const meetingStart = new Date(meeting.start);
      const meetingEnd = new Date(meeting.end);
      
      return (
        meeting.room_type === room &&
        (
          (newStart >= meetingStart && newStart < meetingEnd) || // New event starts during existing event
          (newEnd > meetingStart && newEnd <= meetingEnd) ||     // New event ends during existing event
          (newStart <= meetingStart && newEnd >= meetingEnd)     // New event completely overlaps existing event
        )
      );
    });
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setFormData(prev => ({
      ...prev,
      start_time: slotInfo.start.toISOString().slice(0, 16),
      end_time: slotInfo.end.toISOString().slice(0, 16)
    }));
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (email, meetingDetails) => {
    try {
      const emailPayload = {
        to: email,
        subject: `Booking Requested: ${meetingDetails.meeting_name}`,
        message: `
          Hi ${meetingDetails.name},\n\n
          Your Booking "${meetingDetails.meeting_name}" has been successfully Requested.\n
          Details:\n
           Room Type: ${meetingDetails.room_type}\n
           Start Time: ${new Date(meetingDetails.start_time).toLocaleString()}\n
           End Time: ${new Date(meetingDetails.end_time).toLocaleString()}\n
           Purpose: ${meetingDetails.purpose}\n\n
          Thank you!\n
        `,
      };
      await axios.post('http://localhost:3002/api/sendemail', emailPayload);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const start = new Date(formData.start_time);
      const end = new Date(formData.end_time);
      const room = formData.room_type;

      if (!isSlotAvailable(start, end, room)) {
        alert('This room is already booked for the selected time slot. Please choose a different time or room.');
        return;
      }

      const payload = {
        ...formData,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
      };

      const response = await axios.post('http://localhost:3002/api/create', payload);
      
      // Update state with the new meeting
      const newMeeting = {
        ...response.data,
        title: `${payload.meeting_name} (${payload.room_type})`,
        start: new Date(payload.start_time),
        end: new Date(payload.end_time)
      };

      setMeetings(prev => [...prev, newMeeting]);

      await sendEmail(formData.email, {
        ...formData,
        start_time: payload.start_time,
        end_time: payload.end_time
      });

      setIsOpen(false);
      setFormData({
        name: '',
        meeting_name: '',
        start_time: '',
        end_time: '',
        purpose: '',
        contact_number: '',
        email: '',
        team_category: '',
        team_sub_category: '',
        room_type: '',
      });

    } catch (error) {
      console.error('Submission failed:', {
        error: error.response?.data || error.message,
        status: error.response?.status
      });
      alert(`Error: ${error.response?.data?.message || 'Failed to create meeting'}`);
    }
  };

  return (
    <div className="flex">
      <div className="bg-[#1D2753]">
        <SideBar />
      </div>
      <div className="ms-[69px] flex-grow">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
          
          {error && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Calendar
              key={meetings.length + Date.now()}
              localizer={localizer}
              events={meetings}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelectSlot}
              views={['month', 'week', 'day']}
              defaultView="month"
              style={{ height: 500, zIndex: 1 }}
              eventPropGetter={() => ({ 
                style: { 
                  backgroundColor: '#4a90e2',
                  borderRadius: '4px',
                  color: 'white',
                  border: 'none'
                } 
              })}
              resizable={false}
              popup
            />
          )}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Add Meeting"
            ariaHideApp={false}
          >
            <h2 className="text-xl font-bold mb-4">Add Meeting</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Meeting Name</label>
                  <input
                    type="text"
                    name="meeting_name"
                    value={formData.meeting_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter meeting name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input
                    type="datetime-local"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Purpose</label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded resize-none"
                    rows="3"
                    placeholder="Enter meeting purpose"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input
                    type="tel"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter email ID"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Team/Company/Office/Clubs
                  </label>
                  <select
                    name="team_category"
                    value={formData.team_category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="cfi_clubs">CFI Clubs</option>
                    <option value="cfi_teams">CFI Teams</option>
                    <option value="nirmaan">Nirmaan</option>
                    <option value="gdc">GDC</option>
                    <option value="iitmaa">IIT Madras Alumni Association</option>
                    <option value="global_engagement">Global Engagement</option>
                    <option value="others">Others</option>
                  </select>

                  {['cfi_clubs', 'cfi_teams', 'nirmaan'].includes(formData.team_category) && (
                    <select
                      name="team_sub_category"
                      value={formData.team_sub_category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded mb-2"
                      required
                    >
                      <option value="" disabled>Select a subcategory</option>
                      {formData.team_category === 'cfi_clubs' && (
                        <>
                          <option value="3D Printing Club">3D Printing Club</option>
                          <option value="Aero Club">Aero Club</option>
                          <option value="Electronics Club">Electronics Club</option>
                          <option value="Horizon">Horizon</option>
                          <option value="iBot Club">iBot Club</option>
                          <option value="Product Design Club">Product Design Club</option>
                          <option value="Programming Club">Programming Club</option>
                          <option value="Team Sahaay">Team Sahaay</option>
                          <option value="Team Envisage">Team Envisage</option>
                          <option value="Webops and Blockchain">Webops and Blockchain</option>
                          <option value="AI Club">AI Club</option>
                          <option value="Biotech Club">Biotech Club</option>
                          <option value="Mathematics Club">Mathematics Club</option>
                          <option value="Cybersecurity Club">Cybersecurity Club</option>
                        </>
                      )}
                      {formData.team_category === 'cfi_teams' && (
                        <>
                          <option value="Raftar Formula Racing">Raftar Formula Racing</option>
                          <option value="Team Abhiyaan">Team Abhiyaan</option>
                          <option value="Team Anveshak">Team Anveshak</option>
                          <option value="Team Avishkar Hyperloop">Team Avishkar Hyperloop</option>
                          <option value="Team Agnirath">Team Agnirath</option>
                          <option value="Team Abhyuday">Team Abhyuday</option>
                          <option value="IGEM">IGEM</option>
                          <option value="Amogh">Amogh</option>
                        </>
                      )}
                      {formData.team_category === 'nirmaan' && (
                        <>
                          <option value="Somfin">Somfin</option>
                          <option value="Electra Wheeler">Electra Wheeler</option>
                          <option value="Tarang">Tarang</option>
                          <option value="Machintell Corp">Machintell Corp</option>
                          <option value="Teraclime">Teraclime</option>
                          <option value="Plenome">Plenome</option>
                          <option value="Krishaka">Krishaka</option>
                          <option value="Kendal">Kendal</option>
                          <option value="Ewebstore">Ewebstore</option>
                        </>
                      )}
                    </select>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Room Type</label>
                  <select
                    name="room_type"
                    value={formData.room_type}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="" disabled>Select a room type</option>
                    <option value="Conference Room 101">Conference Room 101</option>
                    <option value="Conference Room 102">Conference Room 102</option>
                    <option value="Meeting Room 1">Meeting Room 1</option>
                    <option value="Meeting Room 2">Meeting Room 2</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send Request
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

















































// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import Modal from 'react-modal';
// import SideBar from '../Components/SideBar';
// import NavBar from '../Components/NavBar';
// import axios from 'axios';

// // Configure moment locale
// moment.locale('en', {
//   week: { dow: 1 }, // Monday as first day of week
//   longDateFormat: {
//     LT: 'h:mm A',
//     LTS: 'h:mm:ss A',
//     L: 'MM/DD/YYYY',
//     LL: 'MMMM D, YYYY',
//     LLL: 'MMMM D, YYYY h:mm A',
//     LLLL: 'dddd, MMMM D, YYYY h:mm A'
//   }
// });

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
//     team_sub_category: '',
//     room_type: '',
//   });
//   const [meetings, setMeetings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Load from localStorage first for instant display
//     const savedMeetings = localStorage.getItem('calendarMeetings');
//     if (savedMeetings) {
//       try {
//         const parsedMeetings = JSON.parse(savedMeetings);
//         setMeetings(parsedMeetings.map(meeting => ({
//           ...meeting,
//           start: new Date(meeting.start),
//           end: new Date(meeting.end)
//         })));
//       } catch (e) {
//         console.error('Failed to parse saved meetings', e);
//       }
//     }

//     // Then fetch fresh data from API
//     fetchMeetings();
//   }, []);

//   useEffect(() => {
//     // Save to localStorage whenever meetings change
//     if (meetings.length > 0) {
//       localStorage.setItem('calendarMeetings', JSON.stringify(meetings));
//     }
//   }, [meetings]);

//   const fetchMeetings = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:3002/api/get');
//       const formattedMeetings = response.data.map(meeting => ({
//         ...meeting,
//         title: `${meeting.meeting_name} (${meeting.room_type})`,
//         start: new Date(meeting.start_time),
//         end: new Date(meeting.end_time),
//       }));
//       setMeetings(formattedMeetings);
//     } catch (error) {
//       console.error('Failed to fetch meetings:', {
//         error: error.response?.data || error.message,
//         status: error.response?.status
//       });
//       setError('Failed to load meetings. Using locally saved data.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isSlotAvailable = (start, end, room) => {
//     return !meetings.some(meeting => {
//       const meetingStart = new Date(meeting.start);
//       const meetingEnd = new Date(meeting.end);
//       return (
//         meeting.room_type === room &&
//         ((start >= meetingStart && start < meetingEnd) ||
//         (end > meetingStart && end <= meetingEnd) ||
//         (start <= meetingStart && end >= meetingEnd))
//       );
//     });
//   };

//   const handleSelectSlot = (slotInfo) => {
//     setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
//     setFormData(prev => ({
//       ...prev,
//       start_time: slotInfo.start.toISOString().slice(0, 16),
//       end_time: slotInfo.end.toISOString().slice(0, 16)
//     }));
//     setIsOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const sendEmail = async (email, meetingDetails) => {
//     try {
//       const emailPayload = {
//         to: email,
//         subject: `Booking Requested: ${meetingDetails.meeting_name}`,
//         message: `
//           Hi ${meetingDetails.name},\n\n
//           Your Booking "${meetingDetails.meeting_name}" has been successfully Requested.\n
//           Details:\n
//           - Room Type: ${meetingDetails.room_type}\n
//           - Start Time: ${new Date(meetingDetails.start_time).toLocaleString()}\n
//           - End Time: ${new Date(meetingDetails.end_time).toLocaleString()}\n
//           - Purpose: ${meetingDetails.purpose}\n\n
//           Thank you!\n
//         `,
//       };
//       await axios.post('http://localhost:3002/api/sendemail', emailPayload);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const start = new Date(formData.start_time);
//       const end = new Date(formData.end_time);
//       const room = formData.room_type;

//       if (!isSlotAvailable(start, end, room)) {
//         alert('This room is already booked for the selected time slot.');
//         return;
//       }

//       const payload = {
//         ...formData,
//         start_time: start.toISOString(),
//         end_time: end.toISOString(),
//       };

//       const response = await axios.post('http://localhost:3002/api/create', payload);
      
//       // Update state with the new meeting
//       const newMeeting = {
//         ...response.data,
//         title: `${payload.meeting_name} (${payload.room_type})`,
//         start: new Date(payload.start_time),
//         end: new Date(payload.end_time)
//       };

//       setMeetings(prev => [...prev, newMeeting]);

//       await sendEmail(formData.email, {
//         ...formData,
//         start_time: payload.start_time,
//         end_time: payload.end_time
//       });

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
//         team_sub_category: '',
//         room_type: '',
//       });

//     } catch (error) {
//       console.error('Submission failed:', {
//         error: error.response?.data || error.message,
//         status: error.response?.status
//       });
//       alert(`Error: ${error.response?.data?.message || 'Failed to create meeting'}`);
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
          
//           {error && (
//             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
//               <p>{error}</p>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : (
//             <Calendar
//               key={meetings.length + Date.now()}
//               localizer={localizer}
//               events={meetings}
//               startAccessor="start"
//               endAccessor="end"
//               selectable
//               onSelectSlot={handleSelectSlot}
//               views={['month', 'week', 'day']}
//               defaultView="month"
//               style={{ height: 500, zIndex: 1 }}
//               eventPropGetter={() => ({ 
//                 style: { 
//                   backgroundColor: '#4a90e2',
//                   borderRadius: '4px',
//                   color: 'white',
//                   border: 'none'
//                 } 
//               })}
//               resizable={false}
//               popup
//             />
//           )}

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
//                           <option value="Plenome">Plenome</option>
//                           <option value="Krishaka">Krishaka</option>
//                           <option value="Kendal">Kendal</option>
//                           <option value="Ewebstore">Ewebstore</option>
//                         </>
//                       )}
//                     </select>
//                   )}
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium mb-1">Room Type</label>
//                   <select
//                     name="room_type"
//                     value={formData.room_type}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   >
//                     <option value="" disabled>Select a room type</option>
//                     <option value="Conference Room">Conference Room</option>
//                     <option value="Meeting Room">Meeting Room</option>
//                     <option value="Auditorium">Auditorium</option>
//                     <option value="Training Room">Training Room</option>
//                   </select>
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























































// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import Modal from 'react-modal';
// import SideBar from '../Components/SideBar';
// import NavBar from '../Components/NavBar';
// import axios from 'axios';

// // Configure moment locale
// moment.locale('en', {
//   week: { dow: 1 }, // Monday as first day of week
//   longDateFormat: {
//     LT: 'h:mm A',
//     LTS: 'h:mm:ss A',
//     L: 'MM/DD/YYYY',
//     LL: 'MMMM D, YYYY',
//     LLL: 'MMMM D, YYYY h:mm A',
//     LLLL: 'dddd, MMMM D, YYYY h:mm A'
//   }
// });

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
//     team_sub_category: '',
//     room_type: '',
//   });
//   const [meetings, setMeetings] = useState([]);

//   useEffect(() => {
//     fetchMeetings();
//   }, []);

//   const fetchMeetings = async () => {
//     try {
//       const response = await axios.get('http://localhost:3002/api/get');
//       const formattedMeetings = response.data.map(meeting => ({
//         ...meeting,
//         title: `${meeting.meeting_name} (${meeting.room_type})`,
//         start: new Date(meeting.start_time),
//         end: new Date(meeting.end_time),
//       }));
//       setMeetings(formattedMeetings);
//     } catch (error) {
//       console.error('Failed to fetch meetings:', {
//         error: error.response?.data || error.message,
//         status: error.response?.status
//       });
//     }
//   };

//   const isSlotAvailable = (start, end, room) => {
//     return !meetings.some(meeting => {
//       const meetingStart = new Date(meeting.start_time);
//       const meetingEnd = new Date(meeting.end_time);
//       return (
//         meeting.room_type === room &&
//         ((start >= meetingStart && start < meetingEnd) ||
//         (end > meetingStart && end <= meetingEnd) ||
//         (start <= meetingStart && end >= meetingEnd))
//       );
//     });
//   };

//   const handleSelectSlot = (slotInfo) => {
//     setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
//     setFormData(prev => ({
//       ...prev,
//       start_time: '',
//       end_time: ''
//     }));
//     setIsOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const sendEmail = async (email, meetingDetails) => {
//     try {
//       const emailPayload = {
//         to: email,
//         subject: `Booking Requested: ${meetingDetails.meeting_name}`,
//         message: `
//           Hi ${meetingDetails.name},\n\n
//           Your Booking "${meetingDetails.meeting_name}" has been successfully Requested.\n
//           Details:\n
//           - Room Type: ${meetingDetails.room_type}\n
//           - Start Time: ${new Date(meetingDetails.start_time).toLocaleString()}\n
//           - End Time: ${new Date(meetingDetails.end_time).toLocaleString()}\n
//           - Purpose: ${meetingDetails.purpose}\n\n
//           Thank you!\n
//         `,
//       };
//       await axios.post('http://localhost:3002/api/sendemail', emailPayload);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const start = new Date(formData.start_time);
//       const end = new Date(formData.end_time);
//       const room = formData.room_type;

//       if (!isSlotAvailable(start, end, room)) {
//         alert('This room is already booked for the selected time slot.');
//         return;
//       }

//       const payload = {
//         ...formData,
//         start_time: start.toISOString(),
//         end_time: end.toISOString(),
//       };

//       const response = await axios.post('http://localhost:3002/api/create', payload);
      
//       // Immediate state update
//       setMeetings(prev => [
//         ...prev,
//         {
//           ...response.data,
//           title: `${payload.meeting_name} (${payload.room_type})`,
//           start: new Date(payload.start_time),
//           end: new Date(payload.end_time)
//         }
//       ]);

//       await sendEmail(formData.email, {
//         ...formData,
//         start_time: payload.start_time,
//         end_time: payload.end_time
//       });

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
//         team_sub_category: '',
//         room_type: '',
//       });

//     } catch (error) {
//       console.error('Submission failed:', {
//         error: error.response?.data || error.message,
//         status: error.response?.status
//       });
//       alert(`Error: ${error.response?.data?.message || 'Failed to create meeting'}`);
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
//             key={meetings.length + Date.now()}
//             localizer={localizer}
//             events={meetings}
//             startAccessor="start"
//             endAccessor="end"
//             selectable
//             onSelectSlot={handleSelectSlot}
//             views={['month', 'week', 'day']}
//             defaultView="month"
//             style={{ height: 500, zIndex: 1 }}
//             eventPropGetter={() => ({ 
//               style: { 
//                 backgroundColor: '#4a90e2',
//                 borderRadius: '4px',
//                 color: 'white',
//                 border: 'none'
//               } 
//             })}
//             resizable={false}
//             popup
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
//                           <option value="Plenome">Plenome</option>
//                           <option value="Krishaka">Krishaka</option>
//                           <option value="Kendal">Kendal</option>
//                           <option value="Ewebstore">Ewebstore</option>
//                         </>
//                       )}
//                     </select>
//                   )}
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium mb-1">Room Type</label>
//                   <select
//                     name="room_type"
//                     value={formData.room_type}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   >
//                     <option value="" disabled>Select a room type</option>
//                     <option value="Conference Room">Conference Room</option>
//                     <option value="Meeting Room">Meeting Room</option>
//                     <option value="Auditorium">Auditorium</option>
//                     <option value="Training Room">Training Room</option>
//                   </select>
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

































































































// import React, { useState, useEffect } from 'react';
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
//     team_sub_category: '',
//     room_type: '',
//   });
//   const [meetings, setMeetings] = useState([]);

//   useEffect(() => {
//     fetchMeetings();
//   }, []);

//   const fetchMeetings = async () => {
//     try {
//       const response = await axios.get('http://localhost:3002/api/get');
//       const formattedMeetings = response.data.map(meeting => ({
//         ...meeting,
//         title: `${meeting.meeting_name} (${meeting.room_type})`,
//         start: new Date(meeting.start_time),
//         end: new Date(meeting.end_time),
//       }));
//       setMeetings(formattedMeetings);
//     } catch (error) {
//       console.error('Error fetching meetings:', error);
//     }
//   };

//   const isSlotAvailable = (start, end, room) => {
//     return !meetings.some(meeting => {
//       const meetingStart = new Date(meeting.start_time);
//       const meetingEnd = new Date(meeting.end_time);
//       return (
//         meeting.room_type === room &&
//         ((start >= meetingStart && start < meetingEnd) ||
//         (end > meetingStart && end <= meetingEnd) ||
//         (start <= meetingStart && end >= meetingEnd))
//       );
//     });
//   };

//   const handleSelectSlot = (slotInfo) => {
//     setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
//     setFormData(prev => ({
//       ...prev,
//       start_time: '',
//       end_time: ''
//     }));
//     setIsOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const sendEmail = async (email, meetingDetails) => {
//     try {
//       const emailPayload = {
//         to: email,
//         subject: `Booking Requested: ${meetingDetails.meeting_name}`,
//         message: `
//           Hi ${meetingDetails.name},\n\n
//           Your Booking "${meetingDetails.meeting_name}" has been successfully Requested.\n
//           Details:\n
//           - Room Type: ${meetingDetails.room_type}\n
//           - Start Time: ${meetingDetails.start_time}\n
//           - End Time: ${meetingDetails.end_time}\n
//           - Purpose: ${meetingDetails.purpose}\n\n
//           Thank you!\n
//         `,
//       };
//       await axios.post('http://localhost:3002/api/sendemail', emailPayload);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const start = new Date(formData.start_time);
//       const end = new Date(formData.end_time);
//       const room = formData.room_type;

//       if (!isSlotAvailable(start, end, room)) {
//         alert('This room is already booked for the selected time slot.');
//         return;
//       }

//       const payload = {
//         ...formData,
//         start_time: start,
//         end_time: end,
//       };

//       const response = await axios.post('http://localhost:3002/api/create', payload);
//       await sendEmail(formData.email, formData);

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
//         team_sub_category: '',
//         room_type: '',
//       });

//       setTimeout(() => fetchMeetings(), 500);
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
//             key={meetings.length + Date.now()}
//             localizer={localizer}
//             events={meetings}
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
//                   <label className="block text-sm font-medium mb-1">Room Type</label>
//                   <select
//                     name="room_type"
//                     value={formData.room_type}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   >
//                     <option value="" disabled>Select a room type</option>
//                     <option value="Conference Room">Conference Room</option>
//                     <option value="Meeting Room">Meeting Room</option>
//                     <option value="Auditorium">Auditorium</option>
//                     <option value="Training Room">Training Room</option>
//                   </select>
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
//                           <option value="Plenome">Plenome</option>
//                           <option value="Krishaka">Krishaka</option>
//                           <option value="Kendal">Kendal</option>
//                           <option value="Ewebstore">Ewebstore</option>
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





























































// import React, { useState, useEffect } from 'react';
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
//     team_sub_category: '',
//     room_type: '',
//   });
//   const [meetings, setMeetings] = useState([]);

//   // Fetch meetings from the backend
//   useEffect(() => {
//     fetchMeetings();
//   }, []);

//   const fetchMeetings = async () => {
//     try {
//       const response = await axios.get('http://localhost:3002/api/get');
//       console.log('Backend response:', response.data); // Debugging

//       // FIX 1: Properly parse dates from backend
//       const formattedMeetings = response.data.map(meeting => ({
//         ...meeting,
//         start: new Date(meeting.start_time), // Direct Date conversion
//         end: new Date(meeting.end_time),    // Direct Date conversion
//       }));

//       console.log('Formatted meetings:', formattedMeetings); // Debugging
//       setMeetings(formattedMeetings);
//     } catch (error) {
//       console.error('Error fetching meetings:', error);
//     }
//   };

//   // Check if the selected slot overlaps with existing meetings
//   const isSlotAvailable = (start, end) => {
//     return !meetings.some(meeting => {
//       const meetingStart = new Date(meeting.start_time);
//       const meetingEnd = new Date(meeting.end_time);
//       return (
//         (start >= meetingStart && start < meetingEnd) ||
//         (end > meetingStart && end <= meetingEnd) ||
//         (start <= meetingStart && end >= meetingEnd)
//       );
//     });
//   };

//   // Handle slot selection
//   const handleSelectSlot = (slotInfo) => {
//     if (!isSlotAvailable(slotInfo.start, slotInfo.end)) {
//         alert('This time slot is already booked. Please choose another slot.');
//         return;
//     }

//     setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });

//     setFormData(prev => ({
//         ...prev,
//         start_time: '',  // Ensure no default time is set
//         end_time: ''
//     }));

//     setIsOpen(true);
// };


//   // Handle input changes in the form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Send email function
//   const sendEmail = async (email, meetingDetails) => {
//     try {
//       const emailPayload = {
//         to: email,
//         subject: `Booking Requested: ${meetingDetails.meeting_name}`,
//         message: `
//           Hi ${meetingDetails.name},\n\n
//           Your Booking "${meetingDetails.meeting_name}" has been successfully Requested.\n
//           Details:\n
//           - Start Time: ${meetingDetails.start_time}\n
//           - End Time: ${meetingDetails.end_time}\n
//           - Purpose: ${meetingDetails.purpose}\n\n
//           Thank you!\n
//         `,
//       };

//       await axios.post('http://localhost:3002/api/sendemail', emailPayload);
//       console.log('Email sent successfully');
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         start_time: new Date(formData.start_time),
//         end_time: new Date(formData.end_time),
//       };
//       console.log('Form data being submitted:', payload); // Debugging

//       // Submit the meeting request
//       const response = await axios.post('http://localhost:3002/api/create', payload);
//       console.log('Meeting created:', response.data); // Debugging

//       // Send email to the provided email ID
//       await sendEmail(formData.email, formData);

//       // Close the modal and reset the form
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
//         team_sub_category: '',
//         room_type: '',
//       });

//       // Refresh the meetings list
//       setTimeout(() => {
//         fetchMeetings();
//       }, 500);
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
//             key={meetings.length + Date.now()} // FIX 2: Force re-render
//             localizer={localizer}
//             events={meetings}
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
//                           <option value="Plenome">Plenome</option>
//                           <option value="Krishaka">Krishaka</option>
//                           <option value="Kendal">Kendal</option>
//                           <option value="Ewebstore">Ewebstore</option>
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