import mongoose from "mongoose";
import { Comment } from "../Models/comment.models.js";
import Post from "../Models/post.model.js";
import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res, next)=>{
    try {
        const { content } = req.body;
        if(!content || content.trim() === ''){
            throw new apiError(404, "Write some content in comment box to post!")
        }

        const { postId, userId } =  req.params;
        const currentPost = await Post.findById(postId).populate({path: "comments", populate: {path:"author", model:"User"}});
        if(!currentPost){
            throw new apiError(404, "Post doesn't exist")
        }
        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new apiError(404, "User doesn't exist")
        }
        const newComment = await Comment.create({content: content, author:currentUser});
        if(!newComment){
            throw new apiError(404, "failed to add create new comment")
        }
        currentPost?.comments?.push(newComment);
        currentUser?.comments?.push(newComment);

        await currentPost.save();
        await currentUser.save();
        return res.status(200).json(new apiResponse(200, "commend added", {currentPost, currentUser}))
    } catch (error) {
        next(error)
    }
})

export const replyComment = asyncHandler(async (req, res, next) => {
    try {
        const { parentCommentId, userId } = req.params;
        const { content } = req.body;

        if (!content || content.trim() === '') {
            throw new apiError(404, "Write some content in the comment box to post!");
        }

        const parentComment = await Comment.findById(parentCommentId);
        if (!parentComment) {
            throw new apiError(404, "Parent comment doesn't exist");
        }

        const currentUser = await User.findById(userId);
        if (!currentUser) {
            throw new apiError(404, "Current user doesn't exist");
        }

        const newComment = await Comment.create({ content: content, author: currentUser._id, parent: parentComment._id });
        parentComment.replies.push(newComment._id);
        currentUser.comments.push(newComment._id);

        await parentComment.save();
        await currentUser.save();

        // Populate the new comment with author information and send it without circular references
        // const populatedNewComment = await Comment.findById(newComment._id).populate('author', 'username email');

        return res.status(200).json(new apiResponse(200, "Comment replied", {parentComment, currentUser}))
        
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

export const deleteComment = asyncHandler(async (req, res, next) => {
    const { commentId } = req.params;
    const { _id: userId } = req.user;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new apiError(404, "Comment doesn't exist");
        }

        if (userId != comment.author.toString()) {
            throw new apiError(401, "Unauthorized attempt, you can delete only your own comment");
        }

        if (comment.parent) {
            const parentComment = await Comment.findById(comment.parent);
            if (parentComment) {
                // Remove the commentId from the parentComment's replies
                parentComment.replies = parentComment.replies.filter(replyId => replyId.toString() !== commentId);
                await parentComment.save();
            }
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            throw new apiError(404, "Failed to delete the comment");
        }

        res.status(200).json(new apiResponse(200, "Comment deleted", deletedComment));
    } catch (error) {
        next(error);
    }
});


export const updateComment = asyncHandler(async (req, res, next)=>{
    const comment = await Comment.findById(req.params?.commentId);
    res.status(200).json( new apiResponse(200, "updatedComment", comment));

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
