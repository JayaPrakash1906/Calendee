import React from 'react';
import SideBar from '../Components/SideBar';
import NavBar from '../Components/NavBar';

const Rooms = () => {
  const conferenceRooms = [
    { id: 1, name: 'Conference Room A', location: 'Floor 1', capacity: 20, amenities: ['Projector', 'Whiteboard', 'Video Conferencing'], time: '10:00 AM' },
    { id: 2, name: 'Conference Room B', location: 'Floor 2', capacity: 15, amenities: ['Projector', 'Whiteboard'], time: '11:00 AM' },
  ];

  const meetingRooms = [
    { id: 1, name: 'Meeting Room 1', location: 'Floor 1', capacity: 8, amenities: ['TV', 'Whiteboard'], time: '10:00 AM' },
    { id: 2, name: 'Meeting Room 2', location: 'Floor 2', capacity: 6, amenities: ['TV'], time: '11:00 AM' },
  ];

  return (
    <div className="flex">
        <div className="bg-[#1D2753]">
            <SideBar />
        </div>
        <div className="ms-[69px] flex-grow">
            <NavBar />
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Room Availability</h1>

      <h2 className="text-xl font-semibold mt-6 mb-4">Conference Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conferenceRooms.map(room => (
          <div key={room.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p className="text-gray-600">{room.location}</p>
            <p className="text-gray-600">Capacity: {room.capacity} people</p>
            <p className="text-gray-600">Amenities: {room.amenities.join(', ')}</p>
            <p className="text-gray-600">Available at: {room.time}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Book
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Meeting Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meetingRooms.map(room => (
          <div key={room.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p className="text-gray-600">{room.location}</p>
            <p className="text-gray-600">Capacity: {room.capacity} people</p>
            <p className="text-gray-600">Amenities: {room.amenities.join(', ')}</p>
            <p className="text-gray-600">Available at: {room.time}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Rooms;