import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SideBar from './SideBar';
import NavBar from './NavBar';

const Booking = () => {
  const location = useLocation();
  const { room } = location.state || {};
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // You can add logic here to handle the date selection
  };

  return (
    <div className="flex">
      <div className="bg-[#1D2753]">
        <SideBar />
      </div>
      <div className="ms-[69px] flex-grow">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
          {room && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="text-gray-600">{room.location}</p>
              <p className="text-gray-600">Capacity: {room.capacity} people</p>
              <p className="text-gray-600">Amenities: {room.amenities.join(', ')}</p>
              <p className="text-gray-600">Available at: {room.time}</p>
            </div>
          )}
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
          />
                </div>
            </div>
        </div>
  );
};

export default Booking;