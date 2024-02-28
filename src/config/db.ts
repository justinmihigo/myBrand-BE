import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri=process.env.MONGODB_URI|| "";
const password = process.env.MONGODB_PASSWORD || "";
const realUri=uri?.replace('<password>',password);
const dbConnection=async()=>{
    try {
        // const realUri="mongodb://127.0.0.1:27017/posts";
    (await mongoose.connect(realUri)).Connection;
    console.log('Database is connected');
    }
    catch (error) {
        console.log(error);
    }
}

export default dbConnection;