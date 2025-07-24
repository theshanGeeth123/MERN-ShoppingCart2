import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCard = () => {
  const { id } = useParams(); // card id
  const navigate = useNavigate();
  const [card, setCard] = useState({
    cardHolder: "",
    cardType: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/card/one/${id}`)
      .then((res) => setCard(res.data))
      .catch((err) => console.error("Failed to load card", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/card/update/${id}`, card);
      alert("Card updated successfully!");
      navigate("/customer/home"); // adjust as per route
    } catch (err) {
      console.error("Error updating card:", err);
      alert("Failed to update card.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Card Holder:
          <input type="text" name="cardHolder" value={card.cardHolder} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Card Type:
          <input type="text" name="cardType" value={card.cardType} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Card Number:
          <input type="text" name="cardNumber" value={card.cardNumber} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Expiry Month:
          <input type="text" name="expMonth" value={card.expMonth} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Expiry Year:
          <input type="text" name="expYear" value={card.expYear} onChange={handleChange} required />
        </label>
        <br />
        <label>
          CVV:
          <input type="text" name="cvv" value={card.cvv} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>Update Card</button>
      </form>
    </div>
  );
};

export default EditCard;
