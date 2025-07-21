import mongoose from "mongoose";

const userCardDetailsSchema = new mongoose.Schema({
    
  userId: {
    type: String,
    required: true,
  },
  cardHolder: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expMonth: {
    type: Number,
    required: true,
  },
  expYear: {
    type: Number,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("UserCardDetailsModel", userCardDetailsSchema);

export default Card;
