import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const navigate = useNavigate();
  const storedCustomer = JSON.parse(localStorage.getItem("customer"));
  const customerData = storedCustomer?.data;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phone: "",
    password: "",
  });

  // Load user data into form
  useEffect(() => {
    if (customerData) {
      setFormData({
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        age: customerData.age,
        phone: customerData.phone,
        password: customerData.password,
      });
    }
  }, [customerData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // DELETE profile
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/customers/users/${customerData._id}`
      );
      localStorage.removeItem("customer");
      alert("Profile deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

        {["firstName", "lastName", "email", "age", "phone", "password"].map(
          (field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "age"
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )
        )}

        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Delete Profile
          </button>

          <button
  onClick={() => window.location.href = "/customer/home"}
  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
>
  Back
</button>

        </div>
      </div>
    </div>
  );
}

export default UserProfile;
