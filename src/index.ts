import express, { Express} from "express";
import mongoose from "mongoose";
import routes from "./routes";
import passport from "passport";
import dbConnection from "./config/db"

    const app: Express = express();
    app.use(express.json());
    // app.use(passport.initialize());
    app.use("/api", routes);
    dbConnection();
    try{
       app.listen(5000, () => {
      console.log("Server has started!");
       });
    }
  catch(error){
    console.error("Error Starting the server:", error);
  }