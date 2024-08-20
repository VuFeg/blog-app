import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/user.route.js";
import { connectDB } from "./db/connectDB.js";

const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(4000, () => {
  connectDB();
  console.log("Server is running on port 4000");
});
