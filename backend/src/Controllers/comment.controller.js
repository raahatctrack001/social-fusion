import mongoose from "mongoose";
import { Comment } from "../Models/comment.models.js";
import Post from "../Models/post.model.js";
import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res, next) => {
    const { content, parent } = req.body;
    const { postId, userId } = req.params;

    console.log("params", req.params);
    console.log("body", req.body);

    // Validate input fields
    if (!content || content.trim() === '') {
        return next(new apiError(417, "Write something to post as comment!"));
    }

    try {
        if (req.user?._id !== userId) {
            throw new apiError(404, "User doesn't exist to comment here!");
        }

        // Create a new comment
        let newComment = await Comment.create({
            content,
            author: userId
        });

        const currentUser = await User.findById(userId);
        if (!currentUser) {
            throw new apiError(404, "User to comment doesn't exist");
        }

        if (!parent) {
            // Check if parent is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(parent)) {
                return next(new apiError(400, "Invalid parent comment ID"));
            }

            // Add reply to parent comment
            const parentComment = await Comment.findById(parent);
            if (!parentComment) {
                return next(new apiError(404, "Parent comment not found"));
            }
            parentComment.replies.push(newComment._id);
            await parentComment.save();
        } else {
            // Add comment to post when parent is null
            const post = await Post.findById(postId);
            if (!post) {
                return next(new apiError(404, "Post not found"));
            }
            post.comments.push(newComment._id);
            await post.save();
        }

        // Add comment to the user's comments list
        currentUser.comments.push(newComment._id);
        await currentUser.save();

        // Populate the author field in the new comment
        newComment = await newComment.populate('author');

        return res.status(200).json(new apiResponse(200, "Comment added", { newComment, currentUser }));
    } catch (error) {
        next(error);
    }
});



export const getComment = asyncHandler(async (req, res, next)=>{
    try {
        const { commentId } = req.params;
        if(!commentId){
            throw new apiError(404, "commentId is required")
        }
        const comments = await Comment.findById(commentId).populate({
            path:"replies",
            populate: {
                path:"author",
                model:"User"
            }
        })
        // if(!comments?.replies?.length){
        //     throw new apiError(404, "no replies yet!")
        // }
        return res.status(200).json(new apiResponse(200, "comment replies fetched", comments?.replies))
    } catch (error) {
        next(error)
    }
})


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

export const likeComment = asyncHandler(async (req, res, next) => {
    try {
        const { commentId, authorId } = req.params;
    
        const comment = await Comment.findById(commentId).populate('author'); // Populate author field
        const currentUser = await User.findById(authorId);
    
        if (!comment) {
            throw new apiError(404, "Comment doesn't exist");
        }    
        if (!currentUser) {
            throw new apiError(404, "User doesn't exist");
        }
        
        const userId = currentUser._id;
        const commentIdIndex = comment.likes.indexOf(userId);

        if (commentIdIndex !== -1) {
            // Unliking the comment
            comment.likes.splice(commentIdIndex, 1);
            const likedCommentsIndex = currentUser.likedComments.indexOf(commentId);
            if (likedCommentsIndex !== -1) {
                currentUser.likedComments.splice(likedCommentsIndex, 1);
            }

            await comment.save();
            await currentUser.save();

            return res.status(200).json(new apiResponse(200, "Comment unliked", { comment, currentUser }));
        }

        // Liking the comment
        comment.likes.push(userId);
        currentUser.likedComments.push(commentId);
        await comment.save();
        await currentUser.save();

        return res.status(200).json(new apiResponse(200, "Comment liked", { comment, currentUser }));
    } catch (error) {
        next(error);
    }
});
