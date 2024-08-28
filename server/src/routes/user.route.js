import express from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
  checkAuth,
} from "../controllers/user.controller.js";
import { protectRoute } from "../../middleware/protectRoute.js";

const router = express.Router();

router.get("/check-auth", protectRoute, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

export default router;
