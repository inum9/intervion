import { Router } from "express";
import { submitAnswer } from "../controllers/interview.Controller.js";
const router= Router();
router.route("/submit-answer").post(submitAnswer)
export {router as interviewRouter};