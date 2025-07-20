import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Replace this URL with your actual backend login endpoint
      const res = await axios.post("http://localhost:5000/api/customers/login", formData);

      // Assuming backend returns user data on successful login
      const userData = res.data;

      // Save login state, here simply using localStorage
      localStorage.setItem("customer", JSON.stringify(userData));

      alert("Login successful!");
      navigate("/customer/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Customer Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate("/customer/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default CustomerLogin;
