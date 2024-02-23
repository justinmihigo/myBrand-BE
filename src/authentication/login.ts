import bcrypt from "bcryptjs";
import express,{NextFunction, Request, Response} from "express"
import * as jwt from "jsonwebtoken";
import passport from "./extract"
import {Strategy, ExtractJwt} from "passport-jwt";
import crypto from "crypto";
import fs from "fs";
import User from "../models/User";
import { validateSignup } from "../utils/validation";
// export const createToken= async(req:Request, res:Response)=>{
//     let user={username:'justin', password:'test123'};
//      const token = jwt.sign({user:user}, "TOP_SECRET_KEY");
//     await fs.writeFile(
//         "local.json",
//         JSON.stringify({ Authorization:token }),
//         (err) => {
//           if (err) throw err;
//         }
//       );
//       const result =await jwt.verify(token, "TOP_SECRET_KEY");
//     res.send(result);
//   console.log('updated');  
// }
// // const profile= async(req: Request, res:Response)=>{
// //     const result =await jwt.verify(token);
// // }
// // const users=[];
// // const register= async(req: Request, res:Response)=>{
// //     try{
// //         const {username, password}= req.body;
// //         const hashedPassword= await bcrypt.hash(password, 10);
// //         const newUser={username,hashedPassword};
// //         users.push(newUser);
// //         res.status(201).json({message:"user registered successfully, user: newUser"})

// //     }
// //     catch(error){
// //         console.log(error);
// //     }
// }

// const login= async(req:Request, res: Response){
//     try{
//         const {username, password}= req.body;
//         const user = users.find((0))=> users.;
//     }
// }

export const register= async(req:Request, res: Response)=>{
    const{username, email, password} = req.body;
    const uniqueEmail= await User.findOne({email:email});
   if (uniqueEmail){
    const error=new Error('email exists');
    res.status(401).send(error.message);
   }
   const {error}=validateSignup.validate(req.body);
   if(error) res.send({error:error.message});
   
   const hashedPassword= await bcrypt.hash(password,10);
   const newUser= new User({
    username,
    email,
    password: hashedPassword
    })
    if(!uniqueEmail){
    await newUser.save();
   res.status(201).send("user saved successfully");
    }
}
export const login= async(req:Request, res:Response, next:NextFunction)=>{
    try{
    const {username, email, password}= req.body;

    const user= await User.findOne({username});
    if(!user){
        res.send(400).send("User not found");
    }
    const hashedPassword=user?.password as string;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if(isMatch){
    const token= jwt.sign({username, email},"SECRET_KEY");
        res.header('Authorization', `Bearer ${token}`);
        res.status(201).send({message:"Login successfull", token:token});
    }
    else{
        res.status(400).send("password doesn't match");
    }
}
catch(err){
    res.status(500).send({message:'server error'});
}
next();
}
export const secureRoute= async(req:Request, res:Response, next:NextFunction)=>{
    passport.authenticate("jwt",{session:false});
    res.json({ message: 'Welcome, ',use:req});
}
