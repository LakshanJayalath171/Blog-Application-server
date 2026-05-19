import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.js";

// add blogs 
export const addBlog = async (req, res) => {
    try {

        // FIXED: directly getting fields from req.body
        // no need JSON.parse(req.body.blog)
        const { title, content, category, isPublished ,upVotes,downVotes,views} = req.body;
        

        // FIXED: proper validation for boolean value
        // because false is also a valid value
        if (
            !title ||
            !content ||
            !category ||
            !isPublished
            
        ) {
            return res.json({
                success: false,
                message: "Missing required fields"
            });
        }

        // checking image
        if (!req.file) {
            return res.json({
                success: false,
                message: "Blog image is required"
            });
        }

        // uploaded image url from cloudinary
        const image = req.file.path;
        const imageId = req.file.filename;

        // blog object

        
        const blogData = {
            title,
            content,
            category,
            image,
            imageId,
            isPublished,
            upVotes:[],
            downVotes:[],
            views
        };

        await Blog.create(blogData)

        // FIXED: you previously returned "blog"
        // but no variable named blog existed
        res.status(201).json({
            success: true,
            message: "Blog added successfully",
            blog: blogData
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get all blogs 

export const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find({isPublished:true})
        res.json({success:true,blogs})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// find blog by id 
export const findBlogById = async(req,res)=>{
    try {
        const {blogId} = req.params;
        
        const blog = await Blog.findById(blogId)
        
        if(!blog){
            return res.json({success:false,message:"Blog not found"})
        }
        blog.views = blog.views + 1
        await blog.save()
        res.json({success:true,blog})
    } 
    catch (error) {
        res.json({success:false,message:error.message})
    }
}

//get voted state
export const getVotedState = async(req,res)=>{
    try {
        const {blogId} = req.params;
        
        const userIp = req.socket.remoteAddress || req.headers["x-forwarded-for"];
        const blog = await Blog.findById(blogId)
        
        if(blog.upVotes.includes(userIp)){
            return res.json({
                success:true,
                upvoted:true
            })
        }
        else if(blog.downVotes.includes(userIp)){
            return res.json({
                success:true,
                downVoted:true
            })
        }
        else{
            res.json({
                success:false,
                message:"Error occurs"
            })
        }
    } 
    catch (error) {
        res.json({success:false,message:error.message})
    }
}

// delete blog

export const deleteBlog = async (req,res)=>{

    try {
        const {blogId} = req.body;
        const blog = await Blog.findById(blogId)

        if(!blog){
            res.json({success:false,message:"Blog not found"})
        }
        //delete blog from databse
        await Blog.findByIdAndDelete(blogId)
        
        //delete blog image from cloudinary
        await cloudinary.uploader.destroy(blog.imageId)
        res.json({success:true,message:"Blog Deletion successfully"})
    } 
    catch (error) {
        res.json({success:false,message:error.message})
    }
}

// toggle publish


export const togglePublish  = async (req,res)=>{
    try {
        const {blogId} = req.body;

        const blog = await Blog.findById(blogId)

        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({success:true,message:"Blog Status Updated!"})
    } 
    catch (error) {
        res.json({success:false,message:error.message})
    }
}


// making Up votes

export const makeUpvote = async (req,res)=>{
    try {
        const {blogId} = req.body;

        const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress
        

        const blog = await Blog.findById(blogId)

        if(!blog){
            return res.json({success:false,message:"blog not found"})
        }

        //already upvoted
        if(blog.upVotes.includes(userIp)){
            return res.json({
                success:false,
                message:"already upvoted"
            })
        }

        blog.downVotes = blog.downVotes.filter((ip)=>ip !==userIp)

        blog.upVotes.push(userIp)
        blog.save()

        res.json({
            success:true,
            upVotes:blog.upVotes.length,
            downVotes:blog.downVotes.length
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// making down votes 

export const makeDownVote = async(req,res)=>{
    try {
        const { blogId } = req.body;

        const userIp = req.socket.remoteAddress || req.headers["x-forwarded-for"];
        

        const blog = await Blog.findById(blogId);

        //check blog exits
        if (!blog) {
          return res.json({
            success: false,
            message: "Blog not found",
          });
        }

        //check already downvoted
        if (blog.downVotes.includes(userIp)) {
          return res.json({
            success: false,
            message: "already downvoted",
          });
        }

        //remove from upvotes

        blog.upVotes = blog.upVotes.filter((ip) => ip !== userIp);

        // add to downvotes
        blog.downVotes.push(userIp);
        blog.save();

        res.json({
          success: true,
          upVotes: blog.upVotes.length,
          downVotes: blog.downVotes.length,
        });
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// get blogs by category
export const getBlogsByCategory= async (req,res)=>{
    try {
        const {category} = req.params;
        
        
        const blog = await Blog.find({
            category,
            isPublished:true
        })

        
        if(blog.length == 0){
            res.json({success:false,message:"No blog found"})
        }
        else{
            res.json({
                success:true,
                totalBlogs:blog.length,
                blog
            })
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//get blogs by by created date

export const getBlogsByDate = async(req,res)=>{
    try {
        const blog = await Blog.find({
            isPublished:true
        }).sort({
            createdAt:-1
        })

        res.json({success:true,blog})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}