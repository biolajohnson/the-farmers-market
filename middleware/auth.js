import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../Models/Users.js";

const auth = asyncHandler(async (req, res, next) => {
  let token = req.header("x-auth-token");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(decoded);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else if (!token) {
    throw new Error("Not Authorized, No token");
  }
});

export default auth;
