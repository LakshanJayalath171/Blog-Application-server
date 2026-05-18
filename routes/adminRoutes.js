import express from "express"
import { adminLogin, allBlogsForAdmin, blogCountBycategory, getBlogCount,topBlogs, getVoteCount } from "../Controllers/adminController.js";

const adminRouter = express.Router();


adminRouter.post("/",adminLogin)
adminRouter.get("/getBlogCount",getBlogCount)
adminRouter.get('/getVotes',getVoteCount)
adminRouter.get('/categoryCount',blogCountBycategory)
adminRouter.get('/topblogs',topBlogs)
adminRouter.get('/allblogs',allBlogsForAdmin)

export default adminRouter;