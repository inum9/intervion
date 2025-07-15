import express from "express";
// import cors from cors
const app =express();
//all middleware  
// app.use(cors());
app.use(express.json()); // ✅ Important for reading req.body
app.use(express.urlencoded({ extended: true })); // optional: for form submissions


export default app;
