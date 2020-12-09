import express from "express";
import { registerUser } from "../../controllers/userController.js";
const router = express.Router();

//create user
router.post("/", registerUser);

export default router;
