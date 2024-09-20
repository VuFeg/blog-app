import jwt from "jsonwebtoken";
import { envConfig } from "./config.js";

export const generateRefreshTokenAndSetCookie = async (userId, res) => {
  try {
    const refreshToken = jwt.sign({ userId }, envConfig.refreshTokenSecret, {
      expiresIn: "30d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    return refreshToken;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
