// src/customer/cardDetails/ViewCardDetails.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewCardDetails = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Get user ID from localStorage
  const customerData = JSON.parse(localStorage.getItem("customer"));
  const userId = customerData?.data?._id;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/card/all/${userId}`
        );
        setCards(response.data);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
        alert("Could not load card details.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCards();
    } else {
      console.warn("User not logged in.");
      setLoading(false);
    }
  }, [userId]);

const handleDelete = async (cardId) => {
  const confirmed = window.confirm("Are you sure you want to delete this card?");
  if (!confirmed) return;

  try {
    console.log("Attempting to delete card with ID:", cardId);

    await axios.delete(`http://localhost:5000/api/card/remove/card/${cardId}`);

    const updatedCards = await axios.get(`http://localhost:5000/api/card/all/${userId}`);
    setCards(updatedCards.data);

    alert("Card deleted successfully.");
  } catch (error) {
    console.error("Error deleting card:", error.response || error.message);
    alert("Failed to delete card.");
  }
};


  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Saved Card Details</h2>

      {loading ? (
        <p>Loading card details...</p>
      ) : cards.length === 0 ? (
        <p>No saved cards found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cards.map((card) => (
            <li
              key={card._id}
              style={{
                background: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <p>
                <strong>Card Holder:</strong> {card.cardHolder}
              </p>
              <p>
                <strong>Card Type:</strong> {card.cardType}
              </p>
              <p>
                <strong>Card Number:</strong> **** **** ****{" "}
                {card.cardNumber?.slice(-4)}
              </p>
              <p>
                <strong>Expiry:</strong> {card.expMonth}/{card.expYear}
              </p>
              <p>
                <strong>CVV:</strong> {card.cvv}
              </p>

              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/customer/card/edit/${card._id}`)}
                >
                  Edit
                </button>

                <button
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(card._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewCardDetails;
