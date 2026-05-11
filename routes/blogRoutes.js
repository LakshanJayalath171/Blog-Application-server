import express from "express";
import { addBlog } from "../Controllers/blogController.js";

const blogRouter = express.Router()

blogRouter.post('/addblog',addBlog)

export default blogRouter
