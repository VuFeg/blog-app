import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
  const { title, content, userId } = req.body;

  try {
    if (!title || !content) {
      res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    const post = await Post.create({ title, content, author: userId });

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPostsUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ author: userId });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
