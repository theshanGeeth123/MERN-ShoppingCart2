import React from "react";
import { useNavigate, Link } from "react-router-dom";

function CustomerHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("customer");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Customer Home Page!
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>

      <Link to={"/home"} className="mt-4 text-green-600 hover:underline">
        Shopping Cart Customer
      </Link>

      <Link
        to="/customer/profile"
        className="mt-4 text-blue-600 hover:underline"
      >
        View & Edit Profile
      </Link>

      {/* ✅ New Add Card Button */}
      <Link
        to="/customer/add-card"
        className="mt-4 text-purple-600 hover:underline"
      >
        ➕ Add Card Details
      </Link>
    </div>
  );
}

export default CustomerHome;
