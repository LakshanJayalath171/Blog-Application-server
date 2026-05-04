import express from "express"
import { adminLogin } from "../Controllers/adminController.js";

const adminRouter = express.Router();


adminRouter.post("/",adminLogin)

export default adminRouter;