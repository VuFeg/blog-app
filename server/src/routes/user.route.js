import express from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
  checkAuth,
} from "../controllers/user.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

export default router;
