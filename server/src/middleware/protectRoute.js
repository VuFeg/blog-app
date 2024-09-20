import User from "../models/user.model.js";
import { envConfig } from "../utils/config.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decode = jwt.verify(token, envConfig.accessTokenSecret);

    if (!decode) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
