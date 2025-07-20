import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerEntry() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome Customer</h1>
        <p className="mb-8 text-gray-600">Please choose an option to continue</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/customer/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/customer/register")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerEntry;
