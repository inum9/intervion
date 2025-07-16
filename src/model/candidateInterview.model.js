import mongoose from "mongoose";

// Candidate Interview Schema
const candidateInterviewSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user (candidate)
    interviewRole: { 
      type: String, 
      required: true, 
      enum: ["developer", "designer", "recruiter"] 
    },
    questions: [
      { 
        type: String, 
        required: true 
      }
    ], // List of questions for the interview
    status: { 
      type: String, 
      enum: ["not_started", "in_progress", "completed"], 
      default: "not_started" 
    }, // Status of the interview (not started, in progress, completed)
    answers: [
      {
        question: { type: String, required: true }, // Interview question
        answer: { type: String, required: true }, // Candidate's answer
        aiFeedback: { type: String }, // AI feedback for the answer
      },
    ],
  },
  { timestamps: true }
);

// Create and export the model
const CandidateInterview = mongoose.model("CandidateInterview", candidateInterviewSchema);

export { CandidateInterview };
