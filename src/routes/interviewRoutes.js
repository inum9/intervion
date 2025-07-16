import { Router } from "express";
import { submitAnswer } from "../controllers/interviewQuestion.Controller.js";

const router = Router();

// Route for submitting an answer and getting AI feedback
router.post("/submit-answer", submitAnswer);

export { router as interviewRoutes };
