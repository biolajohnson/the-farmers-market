import mongoose from "mongoose";

const schemaProfile = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Profile = mongoose.model("profile", schemaProfile);
export default Profile;
