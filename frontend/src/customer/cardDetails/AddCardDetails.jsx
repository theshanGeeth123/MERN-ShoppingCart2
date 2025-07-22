import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCardDetails() {
  const [cardHolder, setCardHolder] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customer = JSON.parse(localStorage.getItem("customer"));
    const userId = customer?.data?._id;

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/card/add", {
        userId,
        cardHolder,
        cardType,
        cardNumber,
        expMonth: Number(expMonth),
        expYear: Number(expYear),
        cvv,
      });

      alert("Card added successfully!");
      navigate("/customer/home");
    } catch (error) {
      console.error("Card add failed:", error);
      alert("Failed to add card");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h2 className="text-2xl font-bold mb-6">Add Card Details</h2>
      <form onSubmit={handleSubmit} className="w-96 bg-white p-6 rounded shadow-md space-y-4">
        <input
          type="text"
          placeholder="Card Holder Name"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Card Type (e.g. Visa, MasterCard)"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Exp. Month (MM)"
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value)}
            required
            className="w-1/2 p-2 border rounded"
            min="1"
            max="12"
          />
          <input
            type="number"
            placeholder="Exp. Year (YYYY)"
            value={expYear}
            onChange={(e) => setExpYear(e.target.value)}
            required
            className="w-1/2 p-2 border rounded"
            min={new Date().getFullYear()}
          />
        </div>
        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Add Card
        </button>
      </form>
    </div>
  );
}

export default AddCardDetails;
