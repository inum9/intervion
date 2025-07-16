 import mongoose from "mongoose";
const interviewQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to Admin who created the question
  },
  { timestamps: true }
);

const InterviewQuestion = mongoose.model("InterviewQuestion", interviewQuestionSchema);

export { InterviewQuestion };
