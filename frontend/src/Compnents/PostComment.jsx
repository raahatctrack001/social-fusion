import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { updateSuccess } from "../redux/slices/user.slice";
import CommentForm from "./CommentForm";
import CommentBox from "./CommentBox";

const PostComment = ({ post }) => {
    // console.log("post", post);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [postCommentContent, setPostCommentContent] = useState('');
    const [render, setRender] = useState(true);
    // const [replyContent, setReplyContent] = useState("");
    // const [showReplyBox, setShowReplyBox] = useState({});
    const [localComments, setLocalComments] = useState(post?.comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []);
    // const [commentReplies, setCommentReplies] = useState({});
    // const [showPopup, setShowPopup] = useState(false)

    const handlePostCommentSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("content", postCommentContent);
            const response = await fetch(apiEndPoints.createCommentAddress(post?._id, currentUser?._id), {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Network response is not ok!");
            }
            if (data.success) {
                console.log("added comment response", data);
                setLocalComments(data?.data?.currentPost?.comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []);
    
                dispatch(updateSuccess(data?.data?.currentUser));
                setPostCommentContent('');
                return;
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
    const handleReportClick = ()=>{

    }
    const handleEditClick = ()=>{

    }
    const handleDeleteClick = async (comment)=>{
        try {
            const response = await fetch(apiEndPoints.deleteCommentAddress(comment?._id), {
                method: "DELETE"
            });

            const data = await response.json();
            if(!response.ok){
                console.log(data.message||"Network response is not ok!")
            }
            if(data.success){
                console.log(data);
                // window.location.reload();
                // alert(data.message + " if it still appears, don't worry we will update shortly or refresh the page!")
                const updatedComment = localComments.filter(reply => reply._id != data?.data?._id);
                setLocalComments(updatedComment);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="p-3">
            {/* Form for posting a comment on the post */}
            <CommentForm
                buttonText={"Post Comment"}
                placeholder={"Write a comment about this post..."}
                parent={parent}
                handlePostCommentSubmit={handlePostCommentSubmit}
                postCommentContent={postCommentContent}
                setPostCommentContent={setPostCommentContent}

                />
            {localComments?.length > 0 && localComments.map((comment, index) => (
                <CommentBox
                    key={index} 
                    post={post}
                    comment={comment} 
                    handleLikeCommentClick={handleLikeCommentClick}
                    handlePostCommentSubmit={handlePostCommentSubmit}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                    handleReportClick={handleReportClick}
                    postCommentContent={postCommentContent}
                    setPostCommentContent={setPostCommentContent}
                    setRender={setRender}
                    // localComments={localComments}
                    // setLocalComments={setLocalComments}
                />
            ))}        
            
        </div>
    );
};

export default PostComment;
