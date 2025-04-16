import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../Assets/oielogo.png';
import logo1 from '../Assets/iitm logo.png';
import backgroundImage from '../Assets/Sudha&Shankar.jpg'; // Adjust the path

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/auth/signup', formData);
      console.log(response.data);
      alert('Signup successful!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:block">
        <img src={backgroundImage} alt="Signup Visual" className="w-full h-full object-cover" />
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
          <div className="flex justify-center items-center gap-4 mb-4">
            <img src={logo1} alt="Logo 1" className="h-16" />
            <img src={logo} alt="Logo 2" className="h-24" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
