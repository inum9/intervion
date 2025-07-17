import mongoose from "mongoose";
const aiInterviewSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    interviewRole: { type: String, required: true },
    questions: [{ type: String, required: true }],
    answers: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        aiFeedback: { type: String },
        aiSuggestions: { type: [String] },  // Store suggestions as an array
      },
    ],
    selectionProbability: { type: Number, default: 0 },
    currentQuestionIndex: { type: Number, default: 0 },
    status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
  },
  { timestamps: true }
);


const AiInterview = mongoose.model("Interview", aiInterviewSchema);

export { AiInterview };
