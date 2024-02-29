import express, { Express} from "express";
import routes from "./routes";
import passport from "passport";
import dbConnection from "./config/db"
import bodyParser from "body-parser";
import specs from "./documentation/swagger";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI,{SwaggerUiOptions} from "swagger-ui-express";
    const app: Express = express();
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(bodyParser.urlencoded({ extended:false}));
    app.use(express.json());
    app.use("/swagger",swaggerUI.serve,swaggerUI.setup(specs));
    app.use("/api", routes);
    app.get("/", (req, res) => res.send("Welcome to Justin's API!"));
     dbConnection(); 
    try{
        app.listen(5000, () => {
      console.log("Server has started!");
       });
    }
  catch(error){
    console.error("Error Starting the server:", error);
  }
  export default app;