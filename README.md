Project Overview
This is a backend system for an AI-powered interview platform. The system allows candidates to participate in mock interviews, submit their answers to role-specific questions, and receive AI-based feedback to improve their performance. The application uses the Google Gemini API to evaluate the answers based on clarity, conciseness, grammar, and relevance. The system also estimates the likelihood of a candidate getting selected based on the AI's evaluation.

Features
AI-Driven Interview System:

Conduct mock interviews where AI asks questions based on the role of the candidate (e.g., Developer, Designer, Recruiter).

AI-Based Answer Evaluation:

After each answer, the AI evaluates the response and provides short, actionable feedback on how to improve the answer.

Selection Probability:

The system calculates the probability of the candidate getting selected based on their performance and AI feedback.

Interview Summary:

After the interview is completed, the system generates a summary of the candidate's performance, including feedback and selection probability.

Mock Interview Scenarios:

The system supports different roles such as Developers, Designers, and Recruiters, each with role-specific questions.

Integration with Google Gemini API:

The system uses the Google Gemini API for analyzing and generating AI feedback based on the candidate's answers.

Tech Stack
Node.js - Server-side JavaScript runtime.

Express.js - Web framework for building RESTful APIs.

MongoDB - NoSQL database to store candidates' information and interview records.

Mongoose - ODM for MongoDB to define schemas and interact with the database.

Google Gemini API - To generate AI feedback and evaluate candidate responses.

Axios - For making HTTP requests.

Swagger UI - For automatic API documentation.

JWT Authentication - For secure user authentication and authorization.

Setup & Installation
Prerequisites
Before you begin, ensure that you have the following installed:

Node.js (v14.x or above)

MongoDB (Local or Atlas for remote setup)

Google Gemini API Key (for AI feedback)

Postman or any other API testing tool (for testing)

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/ai-interview-backend.git
cd ai-interview-backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory and add your environment variables:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/interviewDB
GEMINI_API_KEY=your-google-gemini-api-key
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRY=1h
Start the server:

bash
Copy
Edit
npm start
The server will be running at http://localhost:3000.

API Documentation
The API endpoints are documented using Swagger and can be accessed at http://localhost:3000/api-docs.

Endpoints
1. Start Interview (POST /api/v1/Ai/start-interview)
Request Body:

json
Copy
Edit
{
  "candidateId": "string",
  "interviewRole": "developer" // other roles: designer, recruiter
}
Response:

json
Copy
Edit
{
  "message": "Interview started successfully",
  "interview": {
    "candidate": "string",
    "interviewRole": "developer",
    "questions": ["question1", "question2"]
  }
}
2. Submit Answer (POST /api/v1/Ai/submit-answer)
Request Body:

json
Copy
Edit
{
  "interviewId": "string",
  "answer": "string"
}
Response:

json
Copy
Edit
{
  "message": "Answer submitted and evaluated",
  "aiFeedback": "AI evaluation feedback",
  "selectionProbability": 80
}
3. Interview Summary (GET /api/v1/Ai/interview-summary)
Request Parameters: interviewId

Response:

json
Copy
Edit
{
  "interviewId": "string",
  "feedbackSummary": "Concise feedback for improvement",
  "selectionProbability": 80
}
Contributing
Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -am 'Add new feature').

Push to the branch (git push origin feature/your-feature).

Create a Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Google Gemini API for providing AI-driven interview feedback.

Swagger UI for automatic API documentation.

This markdown will help you provide a solid description of your project, the technology stack used, and detailed API documentation for anyone who needs to understand how to interact with your backend service.









Ask ChatGPT
