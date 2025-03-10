import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';

const BiometricAccess = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    department: '',
    contactInfo: '',
    biometricType: '',
    reason: '',
    accessDuration: '',
    approvedBy: '',
    accessLocation: '',
    consent: false,
  });

  // Fetch existing requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/getreq');
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        alert('Failed to fetch requests. Please try again later.');
      }
    };
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('You must consent to biometric data collection.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/api/createreq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response) {
        const newRequest = await response.json();
      setRequests([...requests, newRequest]);
      alert('Request submitted successfully!');
      setFormData({
        fullName: '',
        employeeId: '',
        department: '',
        contactInfo: '',
        biometricType: '',
        reason: '',
        accessDuration: '',
        approvedBy: '',
        accessLocation: '',
        consent: false,
      });
      }

      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex">
      <div className="bg-[#1D2753]">
        <SideBar />
      </div>
      <div className="ms-[69px] flex-grow">
        <NavBar />
        <div className="mx-10 my-5">
          <h1 className="text-2xl font-bold mb-5">Biometric Access Request</h1>

          {/* Request Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-lg mb-8">
            {/* Form Fields */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Student ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Department</option>
                <option value="Nirmaan Teams">Nirmaan Teams</option>
                <option value="CFI Clubs">CFI Clubs</option>
                <option value="CFI Competition">CFI Competition</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
              <input
                type="tel"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Biometric Type</label>
              <select
                name="biometricType"
                value={formData.biometricType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Type</option>
                <option value="Fingerprint">Fingerprint</option>
                <option value="Facial Recognition">Facial Recognition</option>
                <option value="Iris Scan">Iris Recognition</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Access Duration</label>
              <input
                type="text"
                name="accessDuration"
                value={formData.accessDuration}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Approved By</label>
              <input
                type="text"
                name="approvedBy"
                value={formData.approvedBy}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Access Location</label>
              <select
                name="accessLocation"
                value={formData.accessLocation}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Location</option>
                <option value="Nirmaan Workspace">Nirmaan Workspace</option>
                <option value="Terrace Hall">Terrace Hall</option>
              </select>
            </div>

            <div className="col-span-2 flex items-center">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label className="text-gray-700">I consent to biometric data collection</label>
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-50% bg-[#2F3B5F] hover:bg-[#263152] text-white font-bold py-2 px-4 rounded"
              >
                Submit Request
              </button>
            </div>
          </form>

          {/* Requests Table */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Submitted Requests</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Student ID</th>
                    <th className="px-4 py-2 text-left">Department</th>
                    <th className="px-4 py-2 text-left">Biometric Type</th>
                    <th className="px-4 py-2 text-left">Access Location</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="border-t">
                      <td className="px-4 py-2">{request.full_name}</td>
                      <td className="px-4 py-2">{request.employee_id}</td>
                      <td className="px-4 py-2">{request.department}</td>
                      <td className="px-4 py-2">{request.biometric_type}</td>
                      <td className="px-4 py-2">{request.access_location}</td>
                      <td className="px-4 py-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          Pending
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricAccess;