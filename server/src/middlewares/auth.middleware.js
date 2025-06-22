import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(400)
        .json({ status: "failed", message: "Middleware: Token not found!" });
    }
    const decodedToken = jwt.verify(token, process.env.SERVER_JWT_KEY);
    const user = await userModel.findById(decodedToken?.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Middleware: User not found!" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
