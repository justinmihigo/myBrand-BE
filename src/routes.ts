import express, { Request, Response } from "express";
import Blog from "./models/Blog";
import * as controller from "./controller/controller"
import * as likesController from "./controller/likeController"
import * as queriesController from "./controller/queriesController";
import passport from "./authentication/passport";
import upload from "./config/multer";
import cloudinary from "./utils/cloudinary";
import { login, register, secureRoute } from "./authentication/login";
const router = express.Router();

router.get("/blogs",controller.getPosts);

router.post("/blogs", controller.createPost);

router.get("/blogs/:id", controller.getPostById);

router.patch("/blogs/:id",controller.updatePost);

router.delete("/blogs/:id", controller.deletePost);
// router.post("/blogs/:id/comments",controller.createComment);
router.post("/blogs/:id/comments",controller.commentCreate);

router.get("/blogs/:id/comments",controller.getAllComments);

router.delete("/blogs/:id/comments/:id",controller.deleteComment);

router.post("/blogs/:id/likes",likesController.addLike);

router.delete("/blogs/:id/likes",likesController.deleteLike);

router.post("/queries", queriesController.createQuery);

router.get("/queries", queriesController.getQueries);

router.get("/queries/:id", queriesController.getQueryById);

router.patch("/queries/:id", queriesController.updateQuery);

router.delete("/queries/:id", queriesController.deletePost);

router.post('/signup',register);

router.post('/login',login);

router.get('/secureRoute',passport.authenticate('jwt',{session:false}),secureRoute);

export default router;
