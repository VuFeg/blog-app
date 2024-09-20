import jwt from "jsonwebtoken";
import { envConfig } from "./config.js";

export const generateAccessTokenAndSetCookie = async (userId, res) => {
  try {
    const accessToken = jwt.sign({ userId }, envConfig.accessTokenSecret, {
      expiresIn: "1h",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
