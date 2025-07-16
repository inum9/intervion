import mongoose from "mongoose";

const candidateInterviewSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    interviewRole: { type: String, required: true, enum: ["developer", "designer", "recruiter"] },
    questions: [{ type: String, required: true }],
    status: { type: String, enum: ["not_started", "in_progress", "completed"], default: "not_started" },
    answers: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        aiFeedback: { type: String }, // AI feedback for the answer
      },
    ],
  },
  { timestamps: true }
);

const CandidateInterview = mongoose.model("CandidateInterview", candidateInterviewSchema);

export { CandidateInterview };
