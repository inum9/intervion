import { AiInterview } from "../model/aiaInterview.model.js";
import { ApiError } from "../utils/ApiError.js ";
import { ApiResponse } from "../utils/ApiResponse.js";

const genrateSummary=async (interviewId)=>{
      const interview=   await AiInterview.findById({interviewId});
        if (!interview)
        {
            throw new  ApiError(402,"interview is not found for id !");
        }
        const summary={
            candidate: interview.candidate,
    interviewRole: interview.interviewRole,
    selectionProbability: interview.selectionProbability,
    feedback: interview.answers.map(answer => ({
      question: answer.question,
      aiFeedback: answer.aiFeedback,
      improvementSuggestions: answer.aiSuggestions,
    })),
    overallPerformance: interview.selectionProbability >= 70 ? 'Good' : 'Needs Improvement',
        }
        if(!summary)
        {
            throw new  ApiError(401,"summary cannot be created !");
        }
        return summary;

};

export {genrateSummary}