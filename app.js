import express from "express";
// import cors from cors
const app =express();
//all middleware  
// app.use(cors());
app.use(express.json()); // ✅ Important for reading req.body
app.use(express.urlencoded({ extended: true })); // optional: for form submissions

import { root as userRoutes } from "./src/routes/user.routes.js";
import { interviewRoutes } from "./src/routes/interviewRoutes.js";
app.use("/api/v1/evaluate",interviewRoutes)
app.use("/api/v1/user",userRoutes);

export default app;
