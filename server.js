import express from "express"
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./config/db.js"

// crating express app 
const app = express()

await connectDB()

// middlewares
app.use(cors())
app.use(express.json())

// routes 
app.get('/',(req,res)=>{
    res.send("API working")
})

const PORT = process.env.PORT|| 3000;

app.listen(PORT,()=>{
    console.log('server started on'+PORT)
})

export default app;
