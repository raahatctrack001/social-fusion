import Post from "../Models/post.model.js"
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/utils.cloudinary.js";

export const createPost = asyncHandler(async (req, res, next)=>{
    if(!req.user){
        throw new apiError(401, "Unauthorized! please login")
    }
    const { title, content } = req.body;
    if([title, content].some(field=>field?.trim()?0:1)){
        throw new apiError(404, "Title of Content for post is missing!")
    }

    try {
        const files = req.files;
        let fileURLs = [];

        for(let i = 0; i < files.length; i++){
            const response = await uploadOnCloudinary(files[i].path);
            fileURLs.push(response)
        }   

        fileURLs.forEach(file=>console.log("files", file))

        // return;/
        await Post.create({
            title,
            content,
            imagesURLs: fileURLs,
            author: req.user
        })
        .then((post)=>{
            res
                .status(200)
                .json(
                    new apiResponse(200, "post uploaded", post)
                )
        })
        .catch(error=>next(error))

    } catch (error) {
       next(error) 
    }
})

export const getPosts = asyncHandler(async (req, res, next)=>{
    try {        
        await Post
            .find({})
            .then((posts)=>{
                res
                    .status(200)
                    .json(
                        new apiResponse(200, "posts fetched!, Populating", posts)
                    )
            })
            .catch(error=>next(error));
    } catch (error) {
        next(error)
    }
})

export const deletePost = asyncHandler(async (req, res, next)=>{
    console.log(req.user);
})