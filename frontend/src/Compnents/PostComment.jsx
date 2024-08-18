import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from 'date-fns'; // Correct import
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { updateSuccess } from "../redux/slices/user.slice";

const PostComment = ({ post, comments, handleReply, handleLike }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [postCommentContent, setPostCommentContent] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [localComments, setLocalComments] = useState(comments); // Local state for comments

    const handlePostCommentSubmit = (e) => {
        e.preventDefault();
        // dispatch(addPostComment(post._id, postCommentContent)); // Dispatch action to add post comment
        // setPostCommentContent("");
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

    return (
        <div className="p-3">
            {/* Form for posting a comment on the post */}
            <form onSubmit={handlePostCommentSubmit} className="mb-4">
                <textarea
                    value={postCommentContent}
                    onChange={(e) => setPostCommentContent(e.target.value)}
                    placeholder="Write a comment about this post..."
                    className="border w-full p-2"
                />
                <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md">
                    Post Comment
                </button>
            </form>
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
                                <button onClick={()=>console.log(comment?.author)} className="text-sm text-gray-500">Reply</button>
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
