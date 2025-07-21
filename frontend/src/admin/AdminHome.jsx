import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>
        <p className="mb-8 text-gray-600">
          Welcome, Admin. You can manage users and products here.
        </p>

        <button
          onClick={() => navigate("/admin/add")}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded transition"
        >
          Add New Admin
        </button>

        <button
          onClick={() => navigate("/adminCart")}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded transition"
        >
          Shopping Cart
        </button>

        <button
          onClick={() => navigate("/admin/view-users")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Manage Users
        </button>
        
      </div>
    </div>
  );
}

export default AdminHome;
