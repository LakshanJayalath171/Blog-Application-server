import express from "express"
import { adminLogin, blogCountBycategory, getBlogCount, getVoteCount } from "../Controllers/adminController.js";

const adminRouter = express.Router();


adminRouter.post("/",adminLogin)
adminRouter.get("/getBlogCount",getBlogCount)
adminRouter.get('/getVotes',getVoteCount)
adminRouter.get('/categoryCount',blogCountBycategory)

export default adminRouter;