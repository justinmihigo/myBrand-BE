import { Request, Response } from "express";
import Blog from "../models/Blog";
import Comment from "../models/Comment";
import cloudinary from "../utils/cloudinary";
import upload from "../config/multer";
import { blogValidation, commentValidation } from "../utils/validation";
export const getPosts = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        res.send(blogs);
      } catch (error) {
        res.status(500).send({ error: "Server error" });
      }
};

export const createPost = async (req: Request, res: Response )=>{
    try {
      
       const result=await cloudinary.uploader.upload(req.body.image);
        const blog = new Blog({
          title: req.body.title,
          image: result?.secure_url,
          content: req.body.content
        });
        const {error} = blogValidation(req.body);
        if (error){
          res.status(400).send({error:error.message});
        }
        await blog.save();
        res.status(200).send({message: "blog saved successfully",blog});
      } 
      catch (error) {
        res.status(400).send({ error: "Invalid request" });
        console.log(error);
      }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        let blog = await Blog.findOne({ _id: req.params.id });
        // const comme=await Comment.findOne({blogId:req.params.id});
        if (!blog) {
          res.status(404).send({ error: "blog not found" });
          return;
        }
        res.send(blog);
      } catch (error) {
        res.status(500).send({ error: "Server error" });
      }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        if (!blog) {
          res.status(404).send({ error: "Blog not found" });
          return;
        }
        if (req.body.title) {
          blog.title = req.body.title;
        }
        if (req.body.content) {
          blog.content = req.body.content;
        }
        await blog.save();
        res.send(blog);
      } catch (error) {
        res.status(500).send({ error: "Server error" });
      }
    };

export const deletePost = async (req: Request, res: Response) => {
    try {
        const deletedBlog = await Blog.deleteOne({ _id: req.params.id });
        if (deletedBlog.deletedCount === 0) {
          res.status(404).send({ error: "Blog not found" });
          return;
        }
        res.status(204).send();
      } catch (error) {
        res.status(500).send({ error: "Server error" });
      }
};
export const createComment=async(req:Request,res:Response)=>{
  try {
    const comment= await Blog.find({_id:req.params.id});
    if (!comment){
      res.status(404).send({error:'blog not found'});
    }
    else{
    const comment= new Comment({
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      date: req.body.date
    });
    await comment.save();
    res.send(comment);     
  } 
}
  catch (error) {
    res.status(500).send({message:"server not found"});
  }
}
export const getAllComments= async(req:Request, res:Response)=>{
  try {
    const comments= await Comment.find();
    res.send(comments);
  } catch (error) {
    res.status(404).send({comment:"not found"});
  }
};
export const deleteComment= async(req:Request, res: Response)=>{
  try {
    const comment = await Comment.findOne({_id:req.params.id});
    if (!comment){
      res.status(404).send({message:'comment not found'});
      return;
    }
    else{
    res.status(204).send({message: "blog deleted successfully"});
    }0
  } catch (error){
    res.status(500).send("server no found")
  }
}

export const commentCreate= async(req:Request, res:Response)=>{
  try {
    const blogId=req.params.id;
 const {name,email,comment}=req.body;
 if(!name || !email || !comment){
  return res.status(400).send({message:'invalid inputs'});
 }
 const blog= await Blog.findById(blogId);
  if(!blog){
    
  res.status(404).json({messsage:"blog not found"});
}
  // const comments= blog?.comments;
  const newComment= new Comment({
    name,
    email,
    comment
  });
  blog?.comments.push(newComment);
 const {error}= commentValidation(req.body);
  if(error){
    res.status(400).send({error: error.message});
  }
  await blog?.save();
  res.status(200).send({
    status:'created',
    data: blog
  })
  } catch (error) {
    console.log(error);
    res.status(500).send({error:'server not found'});
  }
 
}
export const getComments= async(req:Request, res:Response)=>{
  const comments= await Comment.find();
  
}