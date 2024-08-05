import { upload } from "../Middlewares/multer.middleware.js";
import Post from "../Models/post.model.js"
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/utils.cloudinary.js";

export const createPost = asyncHandler(async (req, res, next)=>{
    
    // uploadOnCloudinary(req.files[0].path)
    // return;
    console.log(req.files)
    try {
        const files = req.files;
        let imageURLs = [{}];
        let videoURLs = [{}];

        files.forEach((file)=>{
            console.log(file);                
        })
        return;
        await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id,
            imageURLs,
            videoURLs,
        })
        .then((post)=>{
            console.log(post)
        })
        .catch(error=>next(error))
        
    } catch (error) {
        next(error)
    }
    
})