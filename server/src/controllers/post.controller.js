import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;

    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!text && !img)
      return res
        .status(400)
        .json({ success: false, message: "Text or image is required" });

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log("Error deleting post: ", error.message);
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      res.status(200).json({ success: true, message: "Post unliked" });
    } else {
      // Like post or you can use post.likes.push(userId)
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });

      if (userId.toString() !== post.user.toString()) {
        const notification = new Notification({
          from: userId,
          to: post.user,
          type: "like",
        });
        await notification.save();
      }

      res
        .status(201)
        .json({ success: true, message: "Post liked successfully" });
    }
  } catch (error) {
    console.log("Error liking/unliking post: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.userId;
    const postId = req.params.id;

    if (!text)
      return res
        .status(400)
        .json({ success: false, message: "Comment text is required" });

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const newComment = { user: userId, text };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.log("Error commenting on post: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString())
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this post",
      });

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log("Error deleting post: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });
    if (posts.length === 0) return res.status(200).json([]);

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log("Error getting all posts: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getLikedPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });

    res.status(200).json({ success: true, likedPosts });
  } catch (error) {
    console.log("Error getting liked post: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const following = user.following;
    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });

    res.status(200).json({ success: true, feedPosts });
  } catch (error) {
    console.log("Error getting following posts: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log("Error getting user posts: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
