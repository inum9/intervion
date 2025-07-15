import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role, // Include the role in the token
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

// Register user function
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  // Check if all fields are provided
  if (!(email && password && role)) {
    throw new ApiError(401, "All fields are required!");
  }

  // Check if the user already exists (based on email)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(401, "User already exists, please login!");
  }

  // Create new user
  const createdUser = await User.create({
    email,
    password,
    role,
  });

  if (!createdUser) {
    throw new ApiError(401, "User was not created properly!");
  }

  // Generate token for the user
  const token = generateToken(createdUser);

  // Send response
  res
    .status(200)
    .json(
      new ApiResponse(200, createdUser, token, "User created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    throw new ApiError(401, "all field are required!!");
  }
  const registeredUser = await User.findOne({ email });
  if (!registeredUser) {
    throw new ApiError(401, "user is not registered please sign up!");
  }
  const isValidPassword = await registeredUser.comparePassword(password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid password!");
  }

  const token = generateToken(registeredUser);
    const loggedInUser = await User.findById(registeredUser._id).select("-password");
    if (!loggedInUser) {
        throw new ApiError(404, "User not found after login!");
    }

  res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, token, "Login successful"));
});

export { registerUser,loginUser };
