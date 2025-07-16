 import { asyncHandler } from "../utils/asyncHandler.js";
 import { ApiError } from "../utils/ApiError.js";
 import { ApiResponse } from "../utils/ApiResponse.js";
 import { InterviewQuestion } from "../model/Question.model.js";
import { request, response } from "express";

 const  createQuestion =asyncHandler (async(request,response)=>{
        const {question ,difficulty }=request.body;
        console.log(`data recieved ${ question} difficulty is  ${difficulty}`);
        if(!(question||difficulty))
        {
            throw new ApiError(401,"data is not filled properly")
        }
       const createdQuestion = await InterviewQuestion.create({
            question,difficulty,createdBy:request.user._id
        });
        if(!createdQuestion) {
            throw new ApiError(500, "Failed to create question");
        }
        response.status(201).json(
            new ApiResponse(201, createdQuestion, "Question created successfully")
        );

 });
 
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await InterviewQuestion.find().populate("createdBy", "email");
  res.status(200).json(new ApiResponse(200, questions, null, "Fetched all questions"));
});

// Get a specific interview question by ID
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await InterviewQuestion.findById(req.params.id).populate("createdBy", "email");
  if (!question) {
    throw new ApiError(404, "Question not found!");
  }
  res.status(200).json(new ApiResponse(200, question, null, "Fetched question"));
});

// Update an existing interview question
const updateQuestion = asyncHandler(async (req, res) => {
  const { question, difficulty } = req.body;
  const updatedQuestion = await InterviewQuestion.findByIdAndUpdate(
    req.params.id,
    { question, difficulty },
    { new: true }
  );
  if (!updatedQuestion) {
    throw new ApiError(404, "Question not found!");
  }
  res.status(200).json(new ApiResponse(200, updatedQuestion, null, "Question updated successfully"));
});

// Delete an interview question
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await InterviewQuestion.findByIdAndDelete(req.params.id);
  if (!question) {
    throw new ApiError(404, "Question not found!");
  }
  res.status(200).json(new ApiResponse(200, null, null, "Question deleted successfully"));
});

export { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion };
