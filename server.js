import express from "express";
import path from "path";
import userRoutes from "./routes/api/users.js";
import authRoutes from "./routes/api/auth.js";
import profileRoutes from "./routes/api/profile.js";
import postRoutes from "./routes/api/post.js";
import uploadRoute from "./routes/uploadRoute.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/error.js";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";
connectDB();

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("the api is on the way!");
});
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("The server is up on port " + port);
});
