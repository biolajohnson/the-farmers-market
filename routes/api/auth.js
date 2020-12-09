import express from "express";
import auth from "../../middleware/auth.js";
import { getUser, loginUser } from "../../controllers/userController.js";
const router = express.Router();

//get registered user
router.route("/").get(auth, getUser);
//login user
router.route("/login").post(loginUser);

export default router;
