import express from "express";
import { addBlog, deleteBlog, findBlogById, getAllBlogs, togglePublish } from "../Controllers/blogController.js";

const blogRouter = express.Router()

blogRouter.post('/addblog',addBlog)
blogRouter.get('/all',getAllBlogs)
blogRouter.get('/:blogId',findBlogById)
blogRouter.delete('/delete',deleteBlog)
blogRouter.post('/toggle-publish',togglePublish)

export default blogRouter
