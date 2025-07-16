 import { Router } from "express";
import { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion } from "../controllers/Question.controller.js";
import { protect, admin } from "../utils/auth.middleware.js"; // Only Admin can access certain routes

const router = Router();

// Admin routes for creating, updating, and deleting questions
router.post("/", protect, admin, createQuestion);
router.get("/", protect, admin, getAllQuestions); // Only Admin can fetch all questions
router.get("/:id", protect, admin, getQuestionById); // Only Admin can fetch specific question
router.put("/:id", protect, admin, updateQuestion); // Only Admin can update questions
router.delete("/:id", protect, admin, deleteQuestion); // Only Admin can delete questions

export { router as questionRoutes };
