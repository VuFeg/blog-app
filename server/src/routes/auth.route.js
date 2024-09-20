import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
  refreshToken,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/check-auth", protectRoute, checkAuth);

router.put("/refresh-token", refreshToken);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
