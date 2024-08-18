import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from 'date-fns'; // Correct import
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { updateSuccess } from "../redux/slices/user.slice";
import CommentForm from "./CommentForm";
import { current } from "@reduxjs/toolkit";

const PostComment = ({ post, comments, handleReply, handleLike }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [postCommentContent, setPostCommentContent] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [localComments, setLocalComments] = useState(comments); // Local state for comments

   

    const handlePostCommentSubmit = async (e) => {
        e.preventDefault();
        // console.log(apiEndPoints.createCommentAddress(post?._id, currentUser?._id));
        // return;
        // console.log(currentUser?.likedComments?.includes(commentId));
        try {
            const formData = new FormData();
            formData.append("content", postCommentContent);
            const response = await fetch(apiEndPoints.createCommentAddress(post?._id, currentUser?._id), {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(response.message || "Network response is not ok!");
            }
            if (data.success) {
                setLocalComments(prevComments => [...prevComments, data?.data?.newComment]);
                dispatch(updateSuccess(data?.data?.currentUser));
                console.log(data.message);
                console.log(data);
                return;
            }
            console.log("Failed to comment");
        } catch (error) {
            console.log(error);
        }
    };

    const handleReplyClick = () => {
        setShowReplyBox(!showReplyBox);
    };

    const handleReplySubmit = (e) => {
        // e.preventDefault();
        // handleReply(comment._id, replyContent);
        // setReplyContent("");
        // setShowReplyBox(false);
    };

    const handleLikeCommentClick = async (commentId, userId) => {
        // console.log(currentUser?.likedComments?.includes(commentId));
        try {
            const response = await fetch(apiEndPoints.likeCommentAddress(commentId, userId), {
                method: "POST"
            });
            if (!response.ok) {
                throw new Error(response.message || "Network response is not ok!");
            }

            const data = await response.json();
            if (data.success) {
                console.log("data.data", data);
                // Update the local state with the new like count
                setLocalComments(prevComments => 
                    prevComments.map(comment =>
                        comment._id === commentId
                            ? data?.data?.comment // Add userId to likes
                            : comment
                    )
                );

                dispatch(updateSuccess(data?.data?.currentUser));
                console.log(data.message);
                console.log(data);
                return;
            }
            console.log("Failed to like the comment");
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(postCommentContent)
    return (
        <div className="p-3">
            {/* Form for posting a comment on the post */}
            <CommentForm
                parent={null}
                handlePostCommentSubmit={handlePostCommentSubmit}
                postCommentContent={postCommentContent}
                setPostCommentContent={setPostCommentContent}
                />
            <div className="rounded-lg">
                {localComments?.length > 0 && localComments.map((comment, index) => (
                    
                    <div key={index} className="border-2 border-black p-3 my-2 rounded-lg">
                        {/* Username and Timestamp */}
                        <div className="flex justify-between items-center mb-2 border-b border-black">
                            <div className="font-semibold">{comment?.author?.username}</div>
                            <div className="text-sm text-gray-500">{formatDistanceToNow(new Date(comment?.updatedAt), { addSuffix: true })}</div>
                        </div>

                        {/* Comment Content */}
                        <div className="mb-2">
                            {comment?.content}
                        </div>

                        {/* Likes, Reply, Upvote */}
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-4">
                                <div className="text-sm font-semibold">{comment?.likes?.length} likes</div>
                                <div className="flex flex-col">
                                    <button onClick={()=>setShowReplyBox(!showReplyBox)} className="text-sm text-gray-500">Reply</button>
                                    {showReplyBox && !comment?.parent && <CommentForm
                                                          parent= {comment}
                                                          handlePostCommentSubmit={handlePostCommentSubmit}
                                                          postCommentContent={postCommentContent}
                                                          setPostCommentContent={setPostCommentContent}
                                                        />}
                                </div>
                            </div>
                            <button
                                onClick={() => handleLikeCommentClick(comment?._id, currentUser?._id)}
                                className="text-blue-500 font-semibold"
                            >
                              {currentUser?.likedComments?.includes(comment?._id) ?  
                                <HiHeart className="text-lg text-red-700" /> : 
                                <HiOutlineHeart className="text-lg text-black"/>
                              }
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostComment;
