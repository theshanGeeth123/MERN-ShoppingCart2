import express from "express";
import { adminRegister, loginAdmin } from "../Controllers/Admin.controller.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", loginAdmin);

export default router;
