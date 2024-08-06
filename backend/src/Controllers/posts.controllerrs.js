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
        await Post.create({
            title,
            content,
            imagesURLs: fileURLs,
            author: req.user?._id
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
            .populate("author") //fix this ... password and refresh token is getting exposed!
            .then((posts)=>{
                if(posts.length == 0){
                    throw new apiError(404, "posts doesn't exist!")
                }
                res
                    .status(200)
                    .json(
                        new apiResponse(200, "posts fetched!, Populating", {posts, "posts length": posts.length})
                    )
            })
            .catch(error=>next(error));
    } catch (error) {
        next(error)
    }
})

export const getPost = asyncHandler(async (req, res, next)=>{
    try {
        await Post
            .findById(req.params?.postId)
            .populate("comments")
            .then((post)=>{
                if(!post){
                    throw new apiError(404, "post doesn't exists!")
                }
                return res
                        .status(200)
                        .json(
                            new apiResponse(200, "post fetched!", post)
                        )
            })
            .catch(error=>next(error))
    } catch (error) {
        next(error);
    }
})

export const deletePost = asyncHandler(async (req, res, next)=>{

    try {
        const postToDelete = await Post.findById(req.params?.postId).populate("author")
        if(!postToDelete){
            throw new apiError(404, "post to be deleted doesn't exist");
        }
        if(req.user?._id != postToDelete?.author?._id){
            throw new apiError(401, "Unauthorized Attempt!, You can only delete you own post")
        }
        await Post
            .findByIdAndDelete(req.params?.postId)
            .then((post)=>{
                res
                    .status(200)
                    .json(
                        new apiResponse(200,  `post with title "${post.title}" is deleted`, post)
                    )

            })
            .catch(error=>next(error))

    } catch (error) {
        next(error)
    }

})

export const likePost = asyncHandler(async(req, res, next)=>{
    const { userId, postId } = req.params;

    try {
        const currentPost = await Post.findById(postId);
        if(!currentPost){
            throw new apiError(404, "post doesn't exist");
        }
        const likes = currentPost.likes;
        const index = likes.findIndex(item => item._id == userId);
        if (index != -1) {
            likes.splice(index, 1);
        }
        else{
            likes.push(userId)
        }
        currentPost.save();
        console.log('reached at the end')
        res
            .status(200)
            .json(
                new apiResponse(200, "post liked", currentPost)
            )
    } catch (error) {
        next(error)
    }
})

export const editPost = asyncHandler(async(req, res, next)=>{
    
})