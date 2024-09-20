import jwt from "jsonwebtoken";

export const verifyToken = async (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
