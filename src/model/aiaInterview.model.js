import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    interviewRole: { type: String, required: true },
    questions: [{ type: String }],
    answers: [
      {
        question: { type: String },
        answer: { type: String },
        aiFeedback: { type: String },
        selectionProbability: { type: Number },
      }
    ],
    currentQuestionIndex: { type: Number, default: 0 },
    status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
  },
  { timestamps: true }
);

const AiInterview = mongoose.model("Interview", interviewSchema);

export { AiInterview };
