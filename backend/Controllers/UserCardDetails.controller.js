import Card from "../Models/UserCardDetails.model.js";

// Add a new user card
export const addUserCard = async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.status(201).json({ message: "Card added successfully", data: newCard });
  } catch (error) {
    res.status(400).json({ message: "Error adding card", error });
  }
};

// Get card details by userId
export const getUserCardDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const card = await Card.findOne({ userId });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving card", error });
  }
};

// Edit card details
export const editUserCard = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedCard = await Card.findOneAndUpdate({ userId }, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card updated successfully", data: updatedCard });
  } catch (error) {
    res.status(400).json({ message: "Error updating card", error });
  }
};

// Remove a user's card
export const removeUserCard = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedCard = await Card.findOneAndDelete({ userId });
    if (!deletedCard) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting card", error });
  }
};
