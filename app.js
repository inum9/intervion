import express from "express";
// import cors from cors
const app =express();
//all middleware  
// app.use(cors());
app.use(express.json()); // ✅ Important for reading req.body
app.use(express.urlencoded({ extended: true })); // optional: for form submissions

import { root as userRoutes } from "./src/routes/user.routes.js";
import { questionRoutes } from "./src/routes/Question.routes.js";
import { interviewRouter } from "./src/routes/interview.routes.js";
import { AIinterviewRoutes } from "./src/routes/Ai.routes.js";

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/question",questionRoutes);
app.use("/api/v1/interview",interviewRouter)
app.use("/api/v1/Ai",AIinterviewRoutes);
export default app;
