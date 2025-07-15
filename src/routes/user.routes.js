import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { protect } from "../utils/auth.middleware.js";

const root = Router();

// Route to register user
root.route("/register").post(registerUser);
root.route("/login").get(loginUser);
//protected routes
root.route("/get-protected").get()

export { root };  // Changed export name to `root` for consistency
