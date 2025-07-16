import mongoose from 'mongoose'; // Import mongoose for ObjectId casting
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CandidateInterview } from "../model/candidateInterview.model.js";
import { evaluateAnswerAi } from "../services/Api_gemini.service.js";

const submitAnswer = asyncHandler(async (req, res) => {
  const { candidateId, question, answer } = req.body;

  // Log input values
  console.log("Received data:", { candidateId, question, answer });

  if (!(candidateId || question || answer)) {
    throw new ApiError(401, "All fields are required! Please fill them.");
  }

  // Cast candidateId to ObjectId before using it in the query
  let candidateObjectId;

  try {
    candidateObjectId = mongoose.Types.ObjectId(candidateId);
  } catch (err) {
    console.error("Error converting candidateId to ObjectId:", err);
    throw new ApiError(400, "Invalid candidate ID format");
  }

  // Log the ObjectId value
  console.log("Converted candidateId to ObjectId:", candidateObjectId);

  // Find the interview for the given candidate
  const interview = await CandidateInterview.findOne({ candidate: candidateObjectId });

  // Log if no interview is found
  if (!interview) {
    console.log("Interview not found for candidateId:", candidateObjectId);
    throw new ApiError(401, "Interview not found for this candidate!");
  }

  // Get AI feedback for the answer
  const aiFeedback = await evaluateAnswerAi(answer);

  const answerObj = {
    question,
    answer,
    aiFeedback,
  };

  interview.answers.push(answerObj);
  await interview.save();

  // Log the successful response
  console.log("Answer and feedback saved successfully");

  res.status(200).json(new ApiResponse(200, answerObj, null, "Answer submitted and evaluated successfully"));
});

export { submitAnswer };
