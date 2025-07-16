import axios from 'axios';
import { text } from 'express';
const AiEndpoint = 'http://localhost:8000/api/v1/evaluate'; // Replace with the actual Gemini API endpoint
const geminiApiKey = process.env.GEMINI_API_KEY; // Store API key securely in .env file
// function to evaluate the answer from ai 
const evaluateAnswerAi=async(answer)=>{
        try {
                    const response= await axios.post(
                        AiEndpoint,
                        {
                            text:answer
                        },
                        {
                            headers:{
                                "Authorization":`Bearer ${geminiApiKey}`,
                                "Content-Type":'application/json'
                            }
                        }
                    );
                    return response.data.feedback;

        } catch (error) {
            console.log(`error in evaluating the answer : ${error}`);
              
            
        }
}
export {evaluateAnswerAi};