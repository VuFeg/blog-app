import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import { connectDB } from "./db/connectDB.js";
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.post("/", (req, res) => {
  const token = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  res.json({ decoded });
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
