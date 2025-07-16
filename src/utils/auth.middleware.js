import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";

// Protect routes for authenticated users
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token and get the user
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      req.user = await User.findById(decoded._id).select("-password");

      next();
    } catch (error) {
      throw new ApiError(401, "Not authorized, token failed");
    }
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, no token");
  }
};

// Only admin can access these routes
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new ApiError(403, "Not authorized as an admin");
  }
};

export { protect, admin };
