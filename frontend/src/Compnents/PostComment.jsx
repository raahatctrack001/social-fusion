import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from 'date-fns';
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from "react-icons/hi";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { updateSuccess } from "../redux/slices/user.slice";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import ShowComments from "./ShowComments";
import PopupWindow from "../Pages/PopupWindow";

const PostComment = ({ post, comments, parent }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [postCommentContent, setPostCommentContent] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [showReplyBox, setShowReplyBox] = useState({});
    const [localComments, setLocalComments] = useState(comments || []);
    const [commentReplies, setCommentReplies] = useState({});
    const [showPopup, setShowPopup] = useState(false)
    const handlePostCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("content", postCommentContent);
            formData.append("parent", parent);
            const response = await fetch(apiEndPoints.createCommentAddress(post?._id, currentUser?._id), {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Network response is not ok!");
            }
            if (data.success) {
                setLocalComments(prevComments =>
                    [data?.data?.newComment, ...(prevComments || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                );

                dispatch(updateSuccess(data?.data?.currentUser));
                setPostCommentContent('');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleReplyClick = async (comment) => {
        setShowPopup(!showPopup)
        return;
        console.log("inside reply click")
        setShowReplyBox(comment?._id)
        try {
            const response = await fetch(apiEndPoints.getCommentAddress(comment?._id));
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Network response is not ok!");
            }
            console.log("data", data);
            setCommentReplies((prevReplies) => ({
                ...prevReplies,
                [comment._id]: data?.data || [],
            }));
            console.log('commentReplies', commentReplies);
            console.log('showreplybox', showReplyBox)
        } catch (error) {
            console.log(error);
        }
    };

    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("content", replyContent);
            formData.append("parent", commentId);
            const response = await fetch(apiEndPoints.createCommentAddress(post?._id, currentUser?._id), {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Network response is not ok!");
            }
            if (data.success) {
                setCommentReplies(prevReplies => ({
                    ...prevReplies,
                    [commentId]: data?.data?.replies // assuming data.data contains the replies for the comment
                }));
                setReplyContent('');
                dispatch(updateSuccess(data?.data?.currentUser));
                console.log("comment reply", commentReplies)
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleLikeCommentClick = async (commentId, userId) => {
        try {
            const response = await fetch(apiEndPoints.likeCommentAddress(commentId, userId), {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error(response.message || "Network response is not ok!");
            }

            const data = await response.json();
            if (data.success) {
                setLocalComments(prevComments =>
                    prevComments.map(comment =>
                        comment._id === commentId
                            ? data?.data?.comment
                            : comment
                    )
                );

                dispatch(updateSuccess(data?.data?.currentUser));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-3">
            {/* Form for posting a comment on the post */}
            <CommentForm
                parent={parent}
                handlePostCommentSubmit={handlePostCommentSubmit}
                postCommentContent={postCommentContent}
                setPostCommentContent={setPostCommentContent}
                />
            <ShowComments 
                localComments={localComments}
                handleLikeCommentClick={handleLikeCommentClick}
                handleReplyClick={handleReplyClick}
                commentReplies={commentReplies}
                showReplyBox={showReplyBox}
                /> 

            {showPopup && <PopupWindow 
                                        heading={"Under Development"} 
                                        information={"Thanks for checking in. This feature is under development, please be patient! you will be notified."}
                                        showPopup={showPopup}
                                        setShowPopup={setShowPopup}
                                        />}          
            
        </div>
    );
};

export default PostComment;
