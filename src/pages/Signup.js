import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.pdfeditor.live/api/auth/signup', formData);
      alert("Registration successful! Please log in.");
      navigate('/login');
    } catch (err) {
      alert("Error: " + (err.response?.data || "Signup failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-8">Join ALLINONEPDF</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="User Name" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500" 
            onChange={(e) => setFormData({...formData, username: e.target.value})} />
          <input type="email" placeholder="Email Address" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="tel" placeholder="Phone Number" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500" 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <input type="password" placeholder="Set Password" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
          
          <button type="submit" className="w-full bg-red-500 text-white p-4 rounded-xl font-black text-lg hover:bg-red-600 transition-all shadow-lg">
            Create Account
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account? <Link to="/login" className="text-red-500 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;