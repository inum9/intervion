import { Router } from "express";
import { startInterview, submitAnswer,summaryGenerated } from "../controllers/AiInterview,controller.js.js";


const router = Router();

// Route to start the interview
router.post("/start-interview", startInterview);

// Route to submit an answer and get AI feedback
router.post("/submit-answer", submitAnswer);

//route for summary genrated 
router.route("/summary/:id").get(summaryGenerated);

export { router as AIinterviewRoutes };
