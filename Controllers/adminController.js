import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js';

export const adminLogin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = jwt.sign({email},process.env.JWT_SECRET)
        res.json({success:true,token})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// all blogs for admin 


export const allBlogsForAdmin = async(req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt:-1});
        res.json({success:true,blogs})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


// const total blog count 

export const getBlogCount = async(req,res)=>{
    try {
        const totalBlogs = await Blog.countDocuments()
        
        res.json({
            success:true,
            totalBlogs
        })
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// const total votes count

export const getVoteCount = async(req,res)=>{
    try {
        const stats = await Blog.aggregate([{
            $group:{
                _id:null,
                totalUpVotes:{
                    $sum:"$upVotes"
                },
                totalDownVotes:{
                    $sum:"$downVotes"
                },
                totalViews:{
                    $sum:"$views"
                }
            }
        }
      ]);
        res.json({
            success:true,
            upVotes:stats[0]?.totalUpVotes || 0,
            downVotes:stats[0]?.totalDownVotes || 0,
            views:stats[0]?.totalViews||0
        })
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// blog count by category

export const blogCountBycategory = async(req,res)=>{
    try {
        const stats = await Blog.aggregate([
            {
                $group:{
                    _id:"$category",
                    totalBlogs:{
                        $sum:1
                    }
                }
            }
        ]);

        res.json({
            success:true,
            data:stats
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}