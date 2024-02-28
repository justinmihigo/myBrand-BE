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
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     token:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       name: Authorization
 *       in: header
 *   security:
 *     - token: []
 *   schemas:
 *     Blogs:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title
 *         content:
 *           type: string
 *           description: The content title
 *         image:
 *           type: string
 *           format: binary
 *           description: The link for the photo
 *       example:
 *         id: 65cc9e41c313567174adb65c
 *         title: Rest APIs
 *         content: API's are important...
 *         image: https://res.cloudinary.com/dzb4gvhwk/image/upload/v1708357372/ib75mqbu…
 *     Comments:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         name:
 *           type: string
 *           description: The name of the person who wrote the comment
 *         comment:
 *           type: string
 *           description: the comment of the user
 *       example:
 *         id: 65cc9e41c313567174adb65c
 *         name: Justin
 *         email: mihigojustin28@gmail.com
 *         comment: this is my comment
 *     Users:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username
 *         email:
 *           type: string
 *           description: The email of a user
 *         password:
 *           type: string
 *           description: The password of a user
 * 
 *       example:
 *         id: 65cc9e41c313567174adb65c
 *         username: mihigo
 *         email: mihigojustin28@gmail.com
 *         password: <password>
 *     Queries:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - query
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the query
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         query:
 *           type: string
 *           description: The query
 *       example:
 *         id: 65cc9e41c313567174adb65c
 *         name: justin
 *         email: mihigojustin28@gmail.com
 *         query: the query of the user
 */

 /**
  * @swagger
  * tags:
  *   name: Blogs
  *   description: The my backend managing API
  */


router.get("/blogs",controller.getPosts);
/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Returns the list of all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blogs'
 */
router.post("/blogs", passport.authenticate('jwt',{session:false}),
upload.single('image'),controller.createPost);
/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     security:
 *       - token: []
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Blogs'
 *     responses:
 *       200:
 *         description: The blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blogs'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Incorrect inputs
 */

router.get("/blogs/:id", controller.getPostById);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c:
 *   get:
 *     summary: Returns the blog by id
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blogs'
 *       400:
 *         description: The book was not found
 */

router.patch("/blogs/:id", passport.authenticate('jwt',{session:false}),controller.updatePost);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c:
 *   patch:
 *     summary: Updates the blog
 *     security:
 *       - token: []
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blogs'
 *     responses:
 *       201:
 *         description: The blog was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blogs'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Incorrect inputs
 */

router.delete("/blogs/:id", passport.authenticate('jwt',{session:false}),controller.deletePost);
/**
 * @swagger
 * /api/blogs/65cfbd536fb489f16bab1d46:
 *   delete:
 *     summary: Delete the blog
 *     security:
 *       - token: []
 *     tags: [Blogs]
 *     parameters:
 *       name: id
 *       in: path
 *       description: id of a blog
 *       
 *     responses:
 *       204:
 *         description: The blog was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blogs'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog not found
 */

// router.post("/blogs/:id/comments",controller.createComment);
router.post("/blogs/:id/comments",controller.commentCreate);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comments'
 *     responses:
 *       200:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comments'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Incorrect inputs
 */
router.get("/blogs/:id/comments",controller.getAllComments);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c/comments:
 *   get:
 *     summary: Returns the list of all the comments on a blog
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: The list of the comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 */

router.delete("/blogs/:id/comments/:id",controller.deleteComment);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c/comments/65cee19c42b04655b54b9883:
 *   delete:
 *     summary: Deletes a comment on a blog
 *     tags: [Comments]
 *     responses:
 *       201:
 *         description: The comment is successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 *       404:
 *         description: comment not found
 *       500:
 *         description: Server error
 */
router.get("/blogs/:id/comments/:id",controller.getCommentbyID);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c/comments/65cee19c42b04655b54b9883:
 *   get:
 *     summary: Returns the comment on a blog
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: The returned comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 *       404:
 *         description: comment not found
 *       500:
 *         description: Server error
 */
router.patch("/blogs/:id/comments/:id",controller.updateComments);

router.post("/blogs/:id/likes",likesController.addLike);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c/likes:
 *   post:
 *     summary: Create a new like
 *     tags: [Likes]
 *     
 *     responses:
 *       200:
 *         description: The Like was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blogs'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Incorrect inputs
 */

router.get("/blogs/:id/likes",likesController.getLikes);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c/likes:
 *   get:
 *     summary: Get likes
 *     tags: [Likes]
 *     
 *     responses:
 *       200:
 *         description: The likes
 *       500:
 *         description: Some server error
 *       400:
 *         description: Incorrect inputs
 */

router.delete("/blogs/:id/likes",likesController.deleteLike);
/**
 * @swagger
 * /api/blogs/65cc9e41c313567174adb65c/likes:
 *   delete:
 *     summary: Delete a like
 *     tags: [Likes]
 *     
 *     responses:
 *       200:
 *         description: The Like was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blogs'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Incorrect inputs
 */
router.post("/queries", queriesController.createQuery);
/**
 * @swagger
 * /api/queries:
 *   post:
 *     summary: Create a new query
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Queries'
 *     responses:
 *       200:
 *         description: The query was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Queries'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Incorrect inputs
 */

router.get("/queries", queriesController.getQueries);
/**
 * @swagger
 * /api/queries:
 *   get:
 *     summary: Returns the list of queries
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Queries'
 *       400:
 *         description: The book was not found
 */


router.get("/queries/:id", queriesController.getQueryById);
/**
 * @swagger
 * /api/queries/65d383b137bf4821d6dc1d54:
 *   get:
 *     summary: Returns the Query by id
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: The returned query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Queries'
 *       400:
 *         description: The query is  was not found
 */
// router.patch("/queries/:id", queriesController.updateQuery);

router.delete("/queries/:id", queriesController.deleteQuery);
/**
 * @swagger
 * /api/queries/65d383b137bf4821d6dc1d54:
 *   delete:
 *     summary: Delete the Query by id
 *     tags: [Queries]
 *     responses:
 *       204:
 *         description: The query was successfully deleted
 *       400:
 *         description: The invalid request
 *       404:
 *         description: the query was not found
 */
router.post('/signup',register);
/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Signup in as admin
 *     tags: [Signup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: Signup  successfully;
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/Users'
 *       500:
 *         description: Server error
 *       
 *       400:
 *         description: Invalid login credentials
 */

router.post('/login',login);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login in as admin
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: Login  successfully;
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/Users'
 *       500:
 *         description: Server error
 *       
 *       400:
 *         description: Invalid login credentials
 */

router.get('/secureRoute',passport.authenticate('jwt',{session:false}),secureRoute);

// router.post('/test',upload.single('image'),(req,res,next) => {
//     const img=req.file?.path;
//    res.send(img);
// })
export default router;
