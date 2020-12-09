import User from "../Models/Users.js";
import asyncHandler from "express-async-handler";
import gravatar from "gravatar";
import generateToken from "../utils/generateToken.js";

//register user
export const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  try {
    //see if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    //gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "PG",
      d: "mm",
    });
    const user = new User({ name, email, avatar, password });
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    throw new Error(e.message);
  }
});

//login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid details");
    }
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//get user
export const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.save();
    res.json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});
