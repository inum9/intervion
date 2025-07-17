import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AiInterview } from "../model/aiaInterview.model.js";
import { evaluateAnswerAi } from "../services/Api_gemini.service.js";
import { genrateSummary } from "../services/interviewSummary.services.js";

const getInterviewQuestions = (role) => {
  const roleQuestions = {
    developer: [
      "Explain the difference between synchronous and asynchronous programming.",
      "What is a closure in JavaScript?",
      "How do you optimize performance in a web application?",
    ],
    designer: [
      "What is the difference between UI and UX design?",
      "Can you explain the design process you follow?",
      "What design tools do you prefer and why?",
    ],
    recruiter: [
      "How do you assess cultural fit during an interview?",
      "What is your experience in handling difficult candidates?",
      "How do you handle salary negotiation?",
    ],
  };

  return roleQuestions[role] || [];
};

const startInterview = asyncHandler(async (req, res) => {
  const { candidateId, interviewRole } = req.body;

  if (!candidateId || !interviewRole) {
    throw new ApiError(400, "Candidate ID and Role are required");
  }

  const questions = getInterviewQuestions(interviewRole);

  const interview = new AiInterview({
    candidate: candidateId,
    interviewRole,
    questions,
  });

  await interview.save();

  res
    .status(201)
    .json(new ApiResponse(201, interview, "Interview started successfully"));
});
const submitAnswer = asyncHandler(async (req, res) => {
  const { interviewId, answer } = req.body;

  if (!interviewId || !answer) {
    throw new ApiError(400, "Interview ID and answer are required");
  }

  const interview = await AiInterview.findById(interviewId);

  if (!interview) {
    throw new ApiError(404, "Interview not found");
  }

  // Get current question and answer
  const question = interview.questions[interview.currentQuestionIndex];

  // Get AI feedback for the answer
  const {aiFeedback,aiSuggestions} = await evaluateAnswerAi(answer);

  // Store the answer and feedback
  interview.answers.push({ question, answer, aiFeedback,aiSuggestions });

  // Calculate the selection probability based on AI feedback
  const selectionProbability = calculateSelectionProbability(aiFeedback);

  // Update interview with the new answer and selection probability
  interview.selectionProbability = selectionProbability;
  interview.currentQuestionIndex += 1;

  if (interview.currentQuestionIndex === interview.questions.length) {
    interview.status = "completed"; // End the interview if all questions are answered
  }

  await interview.save();

  res
    .status(200)
    .json(new ApiResponse(200, interview, "Answer submitted and evaluated"));
});

// Calculate selection probability based on AI feedback
const calculateSelectionProbability = (aiFeedback) => {
  let score = 0;

  // Simple example logic: If AI feedback includes 'good', add points
  if (aiFeedback.includes("good") || aiFeedback.includes("strong")) {
    score += 20;
  }

  return Math.min(score, 100); // Cap at 100%
};
const summaryGenerated= asyncHandler(async(req,res)=>{
  const {interviewId}=req.params;
  if(!interviewId)
  {
    throw new ApiError(401,"interview id not found");
  }
  console.log(interviewId);
  const summary=  await genrateSummary(interviewId);
  if(!summary)
  {
    throw new ApiError(401," summary not  found ");

  }
  res.status(200).json (new ApiResponse(200,summary,"summary created successfully!!"))
  
  
})

export { startInterview, submitAnswer ,summaryGenerated};
