import express from "express";
import auth from "../../middleware/auth.js";
import {
  createProfile,
  getAllProfiles,
  getMyProfile,
  getProfile,
  deleteProfile,
} from "../../controllers/profileController.js";
const router = express.Router();

router.route("/").post(auth, createProfile).get(auth, getAllProfiles);

router.route("/me").get(auth, getMyProfile).delete(auth, deleteProfile);

router.route("/:id").get(auth, getProfile);

export default router;
