import { GoogleGenAI } from "@google/genai";

// Initialize the AI client
const ai = new GoogleGenAI({});

async function evaluateAnswerAi(answer) {
  try {
    // Customizing the prompt to focus on concise and useful feedback
    const prompt = `
      You are an experienced interviewer in all corporate fields.
      Evaluate the following answer based on clarity, conciseness, grammar, and relevance.
      Provide short and actionable feedback that can help the candidate improve their answer.
      Suggest areas for improvement, such as structure, vocabulary, depth of answer, etc.
      Be clear and to the point, focusing on what the candidate can improve without unnecessary details.
      
      Candidate's answer: "${answer}"
    `;

    // Send the answer to the AI model with the custom prompt
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Ensure this model exists or switch to the correct one
      contents: prompt,          // Use the custom prompt
    });

    // Extract feedback and suggestions from the AI response
    const feedback = response.text || "AI evaluation failed. Please try again later.";
    const suggestions = extractSuggestions(feedback);

    return { aiFeedback: feedback, aiSuggestions: suggestions };

  } catch (error) {
    console.error("Error generating feedback:", error.message);
    return {
      aiFeedback: "AI evaluation failed. Please try again later.",
      aiSuggestions: ["No suggestions available due to error."]
    };
  }
}

// A helper function to extract actionable suggestions from the AI feedback
function extractSuggestions(feedback) {
  // You can implement more sophisticated logic here to extract actionable suggestions
  if (feedback.includes("could be more concise")) {
    return ["Try to be more concise in your responses."];
  }
  if (feedback.includes("needs more detail")) {
    return ["Provide more details on your thought process."];
  }
  if (feedback.includes("clarity can be improved")) {
    return ["Work on the clarity of your explanation."];
  }

  // Default suggestion if none found
  return ["Keep up the good work!"];
}

export { evaluateAnswerAi };
