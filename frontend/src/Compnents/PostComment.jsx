import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addPostComment } from "../actions/postActions"; // Import your action to handle adding comments
import { formatDistanceToNow } from 'date-fns'; // Correct import
import { HiArrowUp, HiOutlineHeart, HiOutlineThumbUp } from "react-icons/hi";
import { HiHandThumbDown, HiHandThumbUp, HiMiniHandThumbUp, HiOutlineHandThumbUp } from "react-icons/hi2";

const PostComment = ({ post, comments, handleReply, handleLike }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [postCommentContent, setPostCommentContent] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);

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

    console.log("comments from postComponents!", post?.comments)
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
            <div className=" rounded-lg">

            {comments?.length > 0 && comments?.map((comment, index)=>{
                return <div key={index} className=" border-2 border-black p-3 my-2 rounded-lg">
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
                              <button className="text-sm text-gray-500">Reply</button>
                            </div>
                            <button className="text-blue-500 font-semibold"><HiOutlineHeart className="text-lg text-black"/></button>
                          </div>
                        </div>
            })}
            </div>
        </div>
    );
};

export default PostComment;
