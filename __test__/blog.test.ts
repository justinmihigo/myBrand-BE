import {beforeAll, afterAll, it, describe, expect, test} from "@jest/globals";
import supertest, { Request, Response } from 'supertest';
import jwt from 'jsonwebtoken';
import app from "../src/index"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();
const DB_URI=process.env.MONGODB_URI || "";
const password= process.env.MONGODB_PASSWORD || "";
const realURI= DB_URI.replace("<password>",password);
beforeAll(async() => {
    await mongoose.connect("mongodb://127.0.0.1:27017");
 }, 50000);
afterAll(async() => {
    await mongoose.connection.close();
 }, 50000);
//  describe("Creating account", () => {
//     it("should create a new account", async() => {
//         const response = await supertest(app).post("/api/signup")
//             .send({username:"justin",email:"mihigo@gmail.com", password:'444'});
//         expect(response.status).toBe(201);
//     }) 
// })
const id= '65da1b0d1557c2a2772f472e';
describe("Logging in", () => {
    const token:{token:string}={token:''};
    it("should login in", async() => {
        const response = await supertest(app).post("/api/login")
          .send({email:"mihigo@gmail.com", password:'444'});
          token.token = response.body.token;
        expect(response.status).toBe(201);
    })
    describe("After login Blogs operations", () => {

    it('if title is not specified', async () => {
        const res = await supertest(app)
          .post('/api/blogs')
          .send({
            content: 'Testing',
            image:""
          }).set('Authorization', 'Bearer ' + token.token)
        expect(res.status).toBe(400);
       
      });

      it('Creating blog image being optional', async () => {
        const res = await supertest(app)
          .post('/api/blogs')
          .send({
            title: 'intergation',
            content: 'Testing',
            image:""
          }).set('Authorization', 'Bearer ' + token.token)
        expect(res.status).toBe(200);
       
      });

      it('if content is not specified', async () => {
        const res = await supertest(app)
          .post('/api/blogs')
          .send({
            title: 'intergation',
            image:""
          }).set('Authorization', 'Bearer ' + token.token)
        expect(res.status).toBe(400);
       
      });

      it('if content is not specified', async () => {
        const res = await supertest(app)
          .post('/api/blogs')
          .send({
            title: 'intergation',
            image:""
          }).set('Authorization', 'Bearer ' + token.token)
        expect(res.status).toBe(400);
      });

       it('Finding a blog byId', async () => {
        const res = await supertest(app)
          .get('/api/blogs/:'+id);
        expect(res.status).toBe(500);
      });  

      it('Deleting a blog', async () => {
        const res = await supertest(app)
        .delete('/api/blogs/:'+id)
        expect(res.status).toBe(401);
      })
});
});

 describe('Testing API',()=>{
     it('getting all blogs should return 200 on /',async()=>{
         const response= await supertest(app).get('/api/blogs');
         expect(response.status).toBe(200);
     })
     it('checking the blogs before should return 404', async()=>{ 
        const response= await supertest(app).get('/api/');
        expect(response.status).toBe(404);
     })
 })

 describe("logging in failing", ()=>{
     it('should return 400 on /login',async()=>{
         const response= await supertest(app).post('/api/login').send("").
         set('email','mihigojustin28@gmail.com').set('password','test123');
         expect(response.status).toBe(400);
     })
     it('should return 400 on invalid credentials',async()=>{
        const response= await supertest(app).post('/api/login').send({email:"mihigojustin",password:""});
        expect(response.status).toBe(400);
     })
    
 })
 describe("Queries", ()=>{
    const queryId=''
    it('should return 200 on get all queries',async()=>{
        const response= await supertest(app).get('/api/queries');
        expect(response.status).toBe(200);
    })
    it('should return one query',async()=>{
        const response= await supertest(app).get('/api/queries/:'+queryId);
        expect(response.status).toBe(500);
    })
    it('Should return 404 for the query that is not found',async()=>{
        const response= await supertest(app).get('/api/queries/:'+queryId);
        expect(response.status).toBe(500);
    })
    it('should return ')
 })
 

describe("Comments",()=>{
    it('should return 200 on get all comments',async()=>{
        const response= await supertest(app).get(`/api/blogs/${id}/comments`);
        expect(response.status).toBe(200);
    })
})

describe("Likes",()=>{
    it('should return 200 on get all likes',async()=>{
        const response= await supertest(app).get(`/api/blogs/${id}/likes`);
        expect(response.status).toBe(200);
    })
    it('should return 201 for creating a like',async()=>{
        const response= await supertest(app).post(`/api/blogs/${id}/likes`);
        expect(response.status).toBe(200);
    })
})





 
