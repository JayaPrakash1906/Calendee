import React, { useState } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';

const Tickets = () => {
  const [statusFilter, setStatusFilter] = useState('Not Closed');

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div className="flex">
        <div className="bg-[#1D2753]">
            <SideBar />
        </div>
        <div className="ms-[69px] flex-grow">
            <NavBar />
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Characteristics - Status</label>
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Not Closed">Not Closed</option>
          <option value="Closed">Closed</option>
          <option value="All">All</option>
        </select>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-center text-gray-600">
        <p>No item found</p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Tickets;