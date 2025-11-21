import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const admin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized as admin" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
