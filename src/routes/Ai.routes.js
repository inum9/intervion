import { Router } from "express";
import { startInterview, submitAnswer } from "../controllers/AiInterview,controller.js.js";

const router = Router();

// Route to start the interview
router.post("/start-interview", startInterview);

// Route to submit an answer and get AI feedback
router.post("/submit-answer", submitAnswer);

export { router as AIinterviewRoutes };
