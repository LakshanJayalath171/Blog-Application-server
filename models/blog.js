import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    isPublished:{type:Boolean,required:true},
    upVotes:{type:Number,default:0},
    downVotes:{type:Number,default:0},
    views:{type:Number,default:0}
},{timestamps:true})

const Blog = mongoose.model('blog',blogSchema);

export default Blog;
