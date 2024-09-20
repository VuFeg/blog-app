import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
} from "../controllers/user.controller.js";

const route = express.Router();
route.get("/profile/:username", protectRoute, getUserProfile);
route.get("/suggested", protectRoute, getSuggestedUsers);
route.post("/follow/:id", protectRoute, followUnfollowUser);
route.post("/update", protectRoute, updateUser);

export default route;
