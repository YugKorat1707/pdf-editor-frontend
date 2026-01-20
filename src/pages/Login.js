import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userName", res.data.username);
      navigate('/');
      window.location.reload(); // Refresh to update navbar
    } catch (err) {
      alert("Login failed: " + (err.response?.data || "Invalid credentials"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border">
        <h2 className="text-3xl font-black text-center mb-8">Login</h2>
        <input type="email" placeholder="Email" required className="w-full p-3 border rounded-lg mb-4" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required className="w-full p-3 border rounded-lg mb-6" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-xl font-black text-lg">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;