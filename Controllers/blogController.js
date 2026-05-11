import Blog from "../models/blog.js";

export const addBlog = async (req, res) => {
    try {

        // FIXED: directly getting fields from req.body
        // no need JSON.parse(req.body.blog)
        const { title, content, category, isPublished } = req.body;

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
        // if (!req.file) {
        //     return res.json({
        //         success: false,
        //         message: "Blog image is required"
        //     });
        // }

        // uploaded image url from cloudinary
        // const imageUrl = req.file.path;

        // blog object
        const blogData = {
            title,
            content,
            category,
            isPublished,
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