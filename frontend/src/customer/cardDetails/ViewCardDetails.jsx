import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewCardDetails = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get userId from localStorage
  const customerData = JSON.parse(localStorage.getItem("customer"));
  const userId = customerData?.data?._id;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/card/all/${userId}`);
        setCards(res.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCards();
    } else {
      console.warn("No user ID found in localStorage.");
      setLoading(false);
    }
  }, [userId]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>All Saved Card Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cards.length === 0 ? (
        <p>No card details found.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cards.map((card, index) => (
            <li
              key={index}
              style={{
                background: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <p><strong>Card Holder:</strong> {card.cardHolder}</p>
              <p><strong>Card Type:</strong> {card.cardType}</p>
              <p><strong>Card Number:</strong> **** **** **** {card.cardNumber.slice(-4)}</p>
              <p><strong>Expiry:</strong> {card.expMonth}/{card.expYear}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewCardDetails;
