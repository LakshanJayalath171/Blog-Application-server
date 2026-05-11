import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./config/db.js";

import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

// creating express app
const app = express();

await connectDB();

// middlewares
app.use(cors());

// FIXED: parses application/json
app.use(express.json());

// FIXED: parses form-data/urlencoded data
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
    res.send("API working");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server started on " + PORT);
});

export default app;