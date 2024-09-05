import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Dropdown } from 'flowbite-react';
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditCommentPopup from './EditCommentPopup';
import CommentBox from './CommentBox';

const   ShowComments = ({ localComments, handleLikeCommentClick }) => {
    const { currentUser } = useSelector(state=>state.user)
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editComment, setEditComment] = useState(null);
    const handleReplyClick = async (comment) => {
        setShowPopup(!showPopup)
        return;
        //console.log("inside reply click")
        setShowReplyBox(comment?._id)
        try {
            const response = await fetch(apiEndPoints.getCommentAddress(comment?._id));
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Network response is not ok!");
            }
            //console.log("data", data);
            setCommentReplies((prevReplies) => ({
                ...prevReplies,
                [comment._id]: data?.data || [],
            }));
            //console.log('commentReplies', commentReplies);
            //console.log('showreplybox', showReplyBox)
        } catch (error) {
            //console.log(error);
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
                //console.log("comment reply", commentReplies)
            }
            
        } catch (error) {
            //console.log(error);
        }
    };
  return (
    <div>
        
        <div className="rounded-lg">
            
        </div>
    </div>
  )
}

export default ShowComments