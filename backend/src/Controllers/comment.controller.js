import { Comment } from "../Models/comment.models.js";
import Post from "../Models/post.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res, next)=>{
    const { author, content, parentCommentId} = req.body;
    
    if([author, content].some(field=>field?.trim()?0:1)){
        throw new apiError(417, "All fields are necessary!");
    }
    try {
        const normalizedParentCommentId = parentCommentId.length && parentCommentId.trim() !== "" ? parentCommentId : null;

        const newComment = await Comment.create({
            author, 
            content,
            parent: normalizedParentCommentId,
        })
        if(normalizedParentCommentId){
            await Comment
                .findById(normalizedParentCommentId)
                .then((parentComment)=>{
                    parentComment.replies.push(newComment);
                    parentComment.save();
                    res 
                    .status(200)
                    .json(
                        new apiResponse(200, "reply added", parentComment)
                    )
                })
                .catch(err=>next(err));
        }
        else{
            await Post
                .findById(req.params?.postId)
                .then((post)=>{
                    post.comments.push(newComment)
                    post.save()
                    res 
                    .status(200)
                    .json(
                        new apiResponse(200, "comments added", newComment)
                    )
                })
                .catch(err=>next(err));


        }

        
    } catch (error) {
        next(error);
    }

})

export const getCommentsOnPost = asyncHandler(async (req, res, next)=>{
    await Comment
            .find({})
            .populate(["author parent"])
            .populate("replies")
            .then((comments)=>{
                res.status(200).json(new apiResponse(200, "comments fetched", comments))
            })

})

export const deleteComment = asyncHandler(async (req, res, next)=>{
    res.status(200).json({message: "we are ready delete comments!"})

})

export const updateComment = asyncHandler(async (req, res, next)=>{
    res.status(200).json({message: "we are ready update comments!"})

})

export const likeComment = asyncHandler(async (req, res, next)=>{
    res.status(200).json({message: "we are ready like the comments!"})

})