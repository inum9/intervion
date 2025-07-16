import { CandidateInterview } from "../model/candidateInterview.model.js";
import { evaluateAnswerAi } from "../services/Api_gemini.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const submitAnswer = asyncHandler(async (req, res) => {
  // Destructure candidateId, question, and answer from the request body
  const { candidateId, question, answer, interviewRole } = req.body;

  // Validate that all required fields are present
  if (!(candidateId && question && answer)) {
    throw new ApiError(400, "All fields (candidateId, question, answer) are required.");
  }

  // Find the interview associated with the candidate
  let interview = await CandidateInterview.findOne({
    candidate: candidateId,
  });

  // Log the interview to check whether it is found or not
  console.log(`Interview found for candidate ${candidateId}:`, interview);

  // If no interview exists for the candidate, create a new one
  if (!interview) {
    console.log("No existing interview found. Creating a new interview...");

    // Use interviewRole from request or default to 'developer'
    const role = interviewRole || "developer";

    // Create a new interview record
    interview = new CandidateInterview({
      candidate: candidateId,
      interviewRole: role,
      questions: [question],  // Add the question to the interview
      status: "in_progress",   // Set the initial status to 'in_progress'
    });

    // Save the new interview to the database
    await interview.save();
  }

  // Get AI feedback for the submitted answer
  const aiFeedback = await evaluateAnswerAi(answer);

  // Create the answer object with AI feedback
  const ansObj = {
    question,
    answer,
    aiFeedback,
  };

  // Add the answer object to the interview's answers array
  interview.answers.push(ansObj);

  // Save the updated interview with the new answer
  await interview.save();

  // Respond with the answer and AI feedback
  res.status(200).json(
    new ApiResponse(
      200,
      ansObj,  // Send the correct object name: ansObj,
      aiFeedback,
      
      "Answer submitted and evaluated successfully"
    )
  );
});

export { submitAnswer };
