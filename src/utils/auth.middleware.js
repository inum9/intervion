import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";

// Middleware to check if the user is authenticated (using JWT)
const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "No token, authorization denied");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;  // Attach user data to the request object
    next();
  } catch (err) {
    throw new ApiError(401, "Token is not valid");
  }
};

export { protect };
