import { Comment } from "../Models/comment.models.js";
import Post from "../Models/post.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res, next) => {
    // console.log(req.params);
    // return;
    const { author, content, parent } = req.body;

    // Validate input fields
    if (!author || !content || author.trim() === '' || content.trim() === '') {
        return next(new apiError(417, "All fields are necessary!"));
    }

    try {
        // Create a new comment
        const newComment = await Comment.create(req.body);

        if (parent) {
            // Add reply to parent comment
            const parentComment = await Comment.findById(parent);
            if (!parentComment) {
                return next(new apiError(404, "Parent comment not found"));
            }
            parentComment.replies.push(newComment._id);
            await parentComment.save();
            return res.status(200).json(new apiResponse(200, "Reply added", parentComment));
        } else {
            // Add comment to post
            const post = await Post.findById(req.params.postId);
            if (!post) {
                return next(new apiError(404, "Post not found"));
            }
            post.comments.push(newComment._id);
            await post.save();
            return res.status(200).json(new apiResponse(200, "Comment added", newComment));
        }
    } catch (error) {
        next(error);
    }
});


export const getCommentsOnPost = asyncHandler(async (req, res, next)=>{
    await Comment
            .find({})
            .populate(["author parent"])
            .populate("replies")
            .then((comments)=>{
                if(!comments){
                    throw new apiError(404, "comment doesn't exist! ")
                }

                res.status(200).json(new apiResponse(200, "comments fetched", comments))
            })

})

export const deleteComment = asyncHandler(async (req, res, next)=>{
    const { commentId } = req.params;
    const { _id : userId } = req.user;

    try {
        await Comment
            .findById(commentId)
            .then((comment)=>{
                if(!comment){
                    throw new apiError(404, "Comment doesn't exist");
                }

                if(userId != comment.author){
                    throw new apiResponse(401, "unauthorized attempt, you can delete only your own comment")
                }

                Comment
                    .findByIdAndDelete(commentId)
                    .then((deletedComment)=>{
                        res.status(200).json(
                            new apiResponse(200, "comment deleted", deletedComment)
                        )
                    })

            }) 
    } catch (error) {
        next(error);
    }


})

export const updateComment = asyncHandler(async (req, res, next)=>{
    res.status(200).json({message: "we are ready update comments!"})

})

export const likeComment = asyncHandler(async (req, res, next)=>{
    

})