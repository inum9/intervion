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
      Be clear and to the point, focusing on what the candidate can improve without unnecessary details.
      
      Candidate's answer: "${answer}"
    `;

    // Send the answer to the AI model with the custom prompt
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Ensure this model exists or switch to the correct one
      contents: prompt,          // Use the custom prompt
    });

    // Extract and return the feedback text from the AI response
    return response.text || "AI evaluation failed. Please try again later.";
  } catch (error) {
    console.error("Error generating feedback:", error.message);
    return "AI evaluation failed. Please try again later.";  // Fallback message
  }
}

export { evaluateAnswerAi };
