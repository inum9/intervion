import mongoose, { Mongoose }  from "mongoose";
const interviewQuestionSchema= new mongoose.Schema({
      role: { type: String, required: true, enum: ["developer", "designer", "recruiter"] },
    questions: [
      {
        type: String,
        required: true,
      },
    ],
},{timestamps:true});

const interviewQuestion= mongoose.model("interviewQuestion",interviewQuestionSchema);
export {interviewQuestion};