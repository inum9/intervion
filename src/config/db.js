import mongoose from "mongoose";
import dbName from "./dbName.js";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});


const connectDb= async ()=>{
 try {
      const connectionInstance=await mongoose.connect(`${process.env.MONGO_DB_URI}/${dbName}`);
   console.log(`database is connected successfully !! at ${connectionInstance.connection.host}`);
   
      
 } catch (error) {
    console.log(`error in database connection : ${error}`);
    
 }

}
export  {connectDb};