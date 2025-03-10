import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import SideBar from '../Components/SideBar';
import NavBar from '../Components/NavBar';
import axios from 'axios';

const localizer = momentLocalizer(moment);

// ... (customStyles remains the same)
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
    team_sub_category: '' // Fixed typo here
  });
  console.log(formData);

  const handleSelectSlot = (slotInfo) => {
    const startTime = moment(slotInfo.start).format('YYYY-MM-DDTHH:mm');
    const endTime = moment(slotInfo.end).format('YYYY-MM-DDTHH:mm');
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setFormData(prev => ({
      ...prev,
      start_time: startTime,
      end_time: endTime
    }));
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        start: new Date(formData.start_time),
        end: new Date(formData.end_time),
      };
      await axios.post('http://localhost:3002/api/create', payload);
      setIsOpen(false);
      // Reset form or handle success
    } catch (error) {
      console.error('Error submitting meeting:', error);
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
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            views={['month', 'week', 'day']}
            defaultView="month"
            style={{ height: 500, zIndex: 1 }}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Add Meeting"
          >
            <h2 className="text-xl font-bold mb-4">Add Meeting</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Name Field */}
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

                {/* Meeting Name Field */}
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

                {/* Start Time Field */}
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

                {/* End Time Field */}
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

                {/* Purpose Field */}
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

                {/* Contact Number Field */}
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

                {/* Email Field */}
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

                {/* Team Category Dropdown */}
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

                  {/* Subcategory Dropdown */}
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
                          <option value="plenome">plenome</option>
                          <option value="Krishaka"></option>
                          <option value="kendal">kendal</option>
                          <option value="Ewebstore">Ewebstore</option>
                        </>
                      )}
                    </select>
                  )}
                </div>
              </div>

              {/* Form Buttons */}
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