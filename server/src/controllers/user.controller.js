import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const followUnfollowUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "You can't follow yourself" });
    }

    if (!userToModify || !currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Kiểm tra người dùng đã follow user có id đó chưa
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // Nếu đã follow thì sẽ thực hiện unfollow
      await User.findByIdAndUpdate(id, {
        $pull: { followers: req.user._id },
      });
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });
      res.status(200).json({ success: true, message: "Unfollowed" });
    } else {
      // Follow the user
      await User.findByIdAndUpdate(id, {
        $push: { followers: req.user._id },
      });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      // Gửi thông báo khi follow user
      const newNotification = new Notification({
        from: req.user._id,
        to: userToModify._id,
        type: "follow",
      });

      await newNotification.save();
      res.status(200).json({ success: true, message: "Followed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const usersFollowedByMe = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );

    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => {
      user.password = undefined;
    });

    res.status(200).json({ success: true, users: suggestedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { username, email, fullName, currentPassword, newPassword, bio, link } =
    req.body;

  let { profileImg, coverImg } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide both current password and new password",
      });
    }

    if (newPassword && currentPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }
      const isMath = await bcrypt.compare(currentPassword, user.password);
      if (!isMath) {
        return res
          .status(400)
          .json({ success: false, message: "Current password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
