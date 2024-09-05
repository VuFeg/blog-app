import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
