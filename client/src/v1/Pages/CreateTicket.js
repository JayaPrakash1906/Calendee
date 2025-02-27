import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";

function CreateTicket() {
  const [formData, setFormData] = useState({
    type: "Request",
    category: "",
    urgency: "Medium",
    locations: "",
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageContent = "Paragraph B I A C ..."; // Replace with actual image content
    const updatedFormData = { ...formData, description: imageContent };
    console.log("Form data submitted:", updatedFormData);
  };

  return (
    <div className="flex">
      <div className="bg-[#1D2753]">
        <SideBar />
      </div>
      <div className="ms-[69px] flex-grow">
        <NavBar />
        <div className="border mx-[100px] my-10 p-6">
          <div className="font-semibold text-lg mb-4">Describe the Request</div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="Request">Request</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="">-----</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Website Support"> Website Support</option>
                <option value="Software Support">Software Support</option>
                <option value="Hosting Support">Hosting Support</option>
                <option value =" others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Urgency</label>
              <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="">-----</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option calue="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Locations</label>
              <select name="locations" value={formData.locations} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                <option value="">-----</option>
                <option value="Ground Floor">Ground floor</option>
                <option value="First Floor">First Floor</option>
                <option value="Nirmaan Workspace">Nirmaan Workspace</option>
                <option value="second Floor">Second Floor</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-2">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" className="w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the incident or request" className="w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-2">File(s) (2 MB max)</label>
              <input type="file" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="col-span-2">
              <button type="submit" className="w-50% bg-[#2F3B5F] text-white p-2 rounded hover:bg-[#2F3B5F]">Submit a Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;