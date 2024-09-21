import User from "../models/user.model.js";
import { envConfig } from "../utils/config.js";
import {verifyToken} from "../utils/verifyToken.js"

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decode = await verifyToken(accessToken, envConfig.accessTokenSecret);

    req.user = decode.userId;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
