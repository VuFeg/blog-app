import express from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
  checkAuth,
  token,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/check-auth", checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/token", token);

router.post("/verify-email", verifyEmail);

export default router;
