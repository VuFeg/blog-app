import express from "express";
import {
  createPost,
  getPosts,
  getPostsUserId,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", createPost);

router.get("/get-posts", getPosts);
router.get("/get-posts/:userId", getPostsUserId);

export default router;
