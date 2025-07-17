
Intervion - AI-Based Interview System
Project Overview
Intervion is a backend system for an AI-powered interview platform. The platform enables candidates to participate in mock interviews, submit their answers, and receive AI-based feedback to improve their performance. The system uses the Google Gemini API to evaluate the answers and calculate the candidate’s selection probability based on their responses.

This project is a Node.js application using Express.js and MongoDB to provide a robust backend solution.


Features
AI-Driven Interview System: Allows candidates to participate in mock interviews by answering role-specific questions asked by AI.
AI-Based Answer Evaluation: After each answer, the AI evaluates the response and provides concise and actionable feedback on how the candidate can improve.
Selection Probability: The system calculates the likelihood of the candidate getting selected based on their performance.
Interview Summary: Generates a summary of the interview after completion, including feedback and the selection probability.
Support for Multiple Roles: Candidates can choose different interview roles (e.g., Developer, Designer, Recruiter) and the system will generate questions specific to that role.

Tech Stack
Node.js: JavaScript runtime for building server-side applications.
Express.js: Web framework for building REST APIs.
MongoDB: NoSQL database for storing candidate and interview data.
Mongoose: ODM (Object Document Mapper) to interact with MongoDB.
Google Gemini API: For evaluating candidate answers and generating AI-based feedback.
postman: For automatically generating and viewing API documentation.
JWT Authentication: For secure user authentication and authorization.
Setup & Installation
Prerequisites
Make sure you have the following installed:
Node.js (v14.x or above)
MongoDB (local or remote using MongoDB Atlas)
Google Gemini API Key (for AI feedback)
Postman (for testing API endpoints)

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/inum9/intervion.git
cd intervion
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
The server will be available at http://localhost:3000.

API Documentation
This project uses Swagger UI to automatically generate API documentation. You can access the documentation at:

bash
Copy
Edit
http://localhost:3000/api-docs
Endpoints
1. Start Interview (POST /api/v1/Ai/start-interview)
Request Body:

json
Copy
Edit
{
  "candidateId": "string",
  "interviewRole": "developer" // Other roles: designer, recruiter
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
Push to your branch (git push origin feature/your-feature).
Create a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgements
Google Gemini API for providing AI-based interview feedback.
postman for automatically generating and displaying API documentation.
This markdown file will give a comprehensive overview of your project, installation instructions, API documentation, and contribution guidelines. It will make it easier for others to understand, use, and contribute to your project.





