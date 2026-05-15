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

        // blog object

        
        const blogData = {
            title,
            content,
            category,
            image,
            isPublished,
            upVotes,
            downVotes,
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
        console.log(blogId)
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success:false,message:"Blog not found"})
        }
        res.json({success:true,blog})
    } 
    catch (error) {
        res.json({success:false,message:error.message})
    }
}

// delete blog

export const deleteBlog = async (req,res)=>{

    try {
        const {blogId} = req.body;
        await Blog.findByIdAndDelete(blogId)
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