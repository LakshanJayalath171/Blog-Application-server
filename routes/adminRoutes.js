import express from "express"
import { adminLogin, blogCountBycategory, getBlogCount, getTopBlogs, getVoteCount } from "../Controllers/adminController.js";

const adminRouter = express.Router();


adminRouter.post("/",adminLogin)
adminRouter.get("/getBlogCount",getBlogCount)
adminRouter.get('/getVotes',getVoteCount)
adminRouter.get('/categoryCount',blogCountBycategory)
adminRouter.get('/topblogs',getTopBlogs)

export default adminRouter;