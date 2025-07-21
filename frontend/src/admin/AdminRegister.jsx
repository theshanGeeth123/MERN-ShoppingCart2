import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    admin_id: "",
    fullName: "",
    email: "",
    role: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        formData
      );

      if (response.data.success) {
        alert("Admin registered successfully! Please login.");
        navigate("/admin/login");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Register</h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="admin_id"
            placeholder="Admin ID"
            value={formData.admin_id}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="role"
            placeholder="Role (e.g., Admin, Manager)"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
