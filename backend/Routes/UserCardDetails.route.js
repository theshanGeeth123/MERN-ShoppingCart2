// routes/UserCardDetails.route.js
import express from "express";
import {
  addUserCard,
  getUserCardDetails,
  editUserCard,
  removeUserCard,
  getAllUserCards,
  updateCard,
  getSingleCardById,
    removeCardById
} from "../Controllers/UserCardDetails.controller.js";

const router = express.Router();

router.post("/add", addUserCard);
router.get("/:userId", getUserCardDetails);
router.put("/edit/:userId", editUserCard);
router.delete("/remove/:userId", removeUserCard);
router.get("/all/:userId", getAllUserCards);
router.put("/update/:id", updateCard);
router.get("/one/:id", getSingleCardById); 
router.delete("/remove/card/:id", removeCardById);


export default router;
