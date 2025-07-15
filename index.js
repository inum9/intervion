import { connectDb } from "./src/config/db.js";
import app from "./app.js";
const port= process.env.PORT||8000;
connectDb().then(
    ()=>{
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`);
            
        })
    }
)