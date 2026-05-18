import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    imageId:{type:String,required:true},
    isPublished:{type:Boolean,required:true},
    upVotes:[{type:String,default:[]}],
    downVotes:[{type:String,default:[]}],
    views:{type:Number,default:0}
},{timestamps:true})

const Blog = mongoose.model('blog',blogSchema);

export default Blog;
