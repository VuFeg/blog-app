import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { Token } from "../models/token.model.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new Error("Please fill in all fields");
    }

    const userAlreadyExists = await User.findOne({ username });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      username,
      email,
      name: username,
      password: bcrypt.hashSync(password, salt),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    const token = generateToken(user._id);
    const responseToken = await Token.create({
      token,
      userId: user._id,
    });

    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
      responseToken,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    user.lastLogin = Date.now();
    const token = generateToken(user._id);

    const responseToken = await Token.create({
      token,
      userId: user._id,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Login success",
      user: {
        ...user._doc,
        password: undefined,
      },
      responseToken,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  const { userId } = req.body;
  const token = await Token.findOneAndDelete(userId);
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }
  res.status(200).json({ success: true, message: "Logout success" });
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyToken = (token) => {
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - invalid token" });
  }

  const userId = decoded.userId;
  return userId;
};

const checkAuth = async (req, res) => {
  const token = req.body.token;

  const userId = verifyToken(token);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Unauthorized" });
  }
};

const token = async (req, res) => {
  const { userId } = req.body;
  try {
    const token = await Token.findOne(userId);
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { register, login, logout, verifyEmail, checkAuth, token };
