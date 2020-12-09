import Profile from "../Models/Profile.js";
import asyncHandler from "express-async-handler";

//create profile
export const createProfile = asyncHandler(async (req, res) => {
  const { firstname, lastname, location, bio } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (firstname) profileFields.firstname = firstname;
  if (lastname) profileFields.lastname = lastname;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;

  try {
    //update
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
    }
    //create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//get a MY profile
export const getMyProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name avatar"]);
    console.log(profile);

    if (!profile) {
      return res.status(400).json({ message: "No profile found" });
    }
    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//get profile by id
export const getProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate("user", ["name avatar"]);
    if (!profile) {
      res.status(400);
      throw new Error("User not found");
    }
    res.status(200).json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//get all the profiles
export const getAllProfiles = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name avatar"]);
    if (!profile) {
      res.status(404);
      throw new Error("No one found");
    }
    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//delete profile
export const deleteProfile = asyncHandler(async (req, res) => {
  try {
    const user = await Profile.findOneAndRemove({ user: req.user.id });
    if (!user) {
      res.status(400);
      throw new Error("No profile found");
    }
    res.send("done!");
  } catch (e) {
    console.log(e.message);
    res.status(400);
    throw new Error(e.message);
  }
});
