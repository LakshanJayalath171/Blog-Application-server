import express from "express";
import { addBlog, deleteBlog, findBlogById, getAllBlogs, getBlogsByCategory, getBlogsByDate, getVotedState, makeDownVote, makeUpvote, togglePublish } from "../Controllers/blogController.js";
import upload from "../middleware/upload.js";
import { topBlogs } from "../Controllers/adminController.js";

const blogRouter = express.Router()

blogRouter.post('/addblog',upload.single('image'),addBlog)
blogRouter.get('/all',getAllBlogs)
blogRouter.get("/date",getBlogsByDate)
blogRouter.get("/popular",topBlogs)
blogRouter.get("/voted/:blogId",getVotedState)
blogRouter.get('/:blogId',findBlogById)
blogRouter.delete('/delete',deleteBlog)
blogRouter.post('/toggle-publish',togglePublish)
blogRouter.post('/upvote',makeUpvote)
blogRouter.post("/downvote",makeDownVote)
blogRouter.get("/category/:category",getBlogsByCategory)



export default blogRouter
