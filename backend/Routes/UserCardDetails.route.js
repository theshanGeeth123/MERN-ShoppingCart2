// routes/UserCardDetails.route.js
import express from "express";
import {
  addUserCard,
  getUserCardDetails,
  editUserCard,
  removeUserCard,
  getAllUserCards,
} from "../Controllers/UserCardDetails.controller.js";

const router = express.Router();

router.post("/add", addUserCard);
router.get("/:userId", getUserCardDetails);
router.put("/edit/:userId", editUserCard);
router.delete("/remove/:userId", removeUserCard);
router.get("/all/:userId", getAllUserCards);


export default router;
