import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Assets/oielogo.png';
import logo1 from '../Assets/iitm logo.png';
import backgroundImage from '../Assets/Sudha&Shankar.jpg'; // Adjust the path

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/auth/login', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/oie/land');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:block">
        <img src={backgroundImage} alt="Login Visual" className="w-full h-full object-cover" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
          {/* Logo */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <img src={logo1} alt="Logo 1" className="h-16" />
            <img src={logo} alt="Logo 2" className="h-24" />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
          
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          
          <p className="mt-4 text-center text-gray-600">
            No account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
