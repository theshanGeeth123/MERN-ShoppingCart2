// src/admin/AddNewAdmin.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddNewAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    admin_id: "",
    fullName: "",
    email: "",
    role: "",
    phoneNumber: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/register", formData);
      alert("Admin registered successfully!");
      navigate("/admin/home");
    } catch (err) {
      alert("Error creating admin: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="admin_id" placeholder="Admin ID" required value={formData.admin_id} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="role" placeholder="Role" required value={formData.role} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" required value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewAdmin;
