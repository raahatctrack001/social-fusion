import { formatDistanceToNow } from 'date-fns';
import { Dropdown } from 'flowbite-react';
import React, { useState } from 'react';
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import CommentForm from './CommentForm';
import { updateSuccess } from '../redux/slices/user.slice';
import EditCommentBox from './EditCommentBox';
import FeatureUnderDevelopmentPopup from './FeatureUnderDevelopmentPopup';
// import { current } from '@reduxjs/toolkit';

const CommentBox = ({ 
    comment, 
    handleLikeCommentClick,
    handleDeleteClick,
    // handleEditClick,
    handleReportClick,
    
}) => {
    console.log("comment", comment);
    const { currentUser } = useSelector(state => state.user);
    const [newComment, setNewComment] = useState(comment);
    const [showCommentReply, setShowCommentReply] = useState(comment?.replies||{});
    const [commentReplies, setCommentReplies] = useState(comment?.replies||{});
    const [replyContent, setReplyContent] = useState('');
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showEditCommentPopup, setShowEditCommentPopup] = useState(false);
    const [editContent, setEditContent] = useState('')
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();

    const handleClosePopup = () => { //under development
        setShowPopup(false);
      };
  
    const handleShowReply = async()=>{
        setShowReplyBox(!showReplyBox);
        handleReplyClick();
    }

    const handleReplyClick = async () => {
        console.log("reply of comment", comment);
        try {
            const response = await fetch(apiEndPoints.getCommentAddress(comment?._id));
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Network response is not ok!");
            }
            console.log(data);

            // Sort the replies by createdAt in descending order
            const sortedReplies = (data?.data || []).filter(reply => !isNaN(new Date(reply.createdAt).getTime()))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Update both states with sorted replies
            setShowCommentReply(prev => ({
                ...prev,
                [comment?._id]: sortedReplies
            }));
            
            setCommentReplies(prevReplies => ({
                ...prevReplies,
                [comment._id]: sortedReplies
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("content", replyContent);
            const response = await fetch(apiEndPoints.replyCommentAddress(comment?._id, currentUser?._id), {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Network response is not ok!");
            }
            if (data.success) {
                console.log("reply comment data", data);
                
                // Sort the new list of replies by createdAt
                const newReply = data?.data?.newComment;
                const updatedReplies = [newReply, ...(commentReplies[comment._id] || [])]
                    .filter(reply => !isNaN(new Date(reply?.createdAt).getTime()))
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Update both states with the new sorted replies
                setCommentReplies(prevReplies => ({
                    ...prevReplies,
                    [comment._id]: updatedReplies
                }));

                setShowCommentReply(prev => ({
                    ...prev,
                    [comment._id]: updatedReplies
                }));

                setReplyContent('');
                dispatch(updateSuccess(data?.data?.currentUser));
                handleReplyClick();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteReplyClick = async (comment)=>{
        try {
            const response = await fetch(apiEndPoints.deleteCommentAddress(comment?._id), {
                method: "DELETE"
            });

            const data = await response.json();
            if(!response.ok){
                console.log(data.message||"Network response is not ok!")
            }
            if(data.success){
                
                handleReplyClick();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = ()=>{
        setError('')
        setShowEditCommentPopup(!showEditCommentPopup)
    }

    const handleEditCommentClick = async ()=>{
        try {
            setError('')
            const formData = new FormData();
            formData.append("editedContent", editContent);
            const response = await fetch(apiEndPoints.updateCommentsAddress(comment?._id), {method: "PATCH", body: formData})
            const data = await response.json()
            if(!response.ok){
                throw new Error(data?.message || "Network response isn't ok! in handleEdit comment click")
            }

            if(data?.success){
                console.log(data);
                setNewComment(data?.data)
                console.log(data);
                setShowEditCommentPopup(!showEditCommentPopup)
            }
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    }
    console.log(editContent)
    return (
        <div className="border-2 border-black p-3 my-2 rounded-lg">
            {/* Username and Timestamp */}
            <FeatureUnderDevelopmentPopup show={showPopup} onClose={handleClosePopup} />
            <div className="flex justify-between items-center mb-2 border-b border-black">
                <div className='flex gap-2'>
                    <Link to={`/authors/author/${newComment?.author?._id}`} className="font-semibold">{newComment?.author?.username}</Link>
                    {newComment?.edited && <p className="text-red-500 font-semibold">edited</p>}
                </div>
                <div className="text-sm">{formatDistanceToNow(new Date(newComment?.createdAt) || new Date(), { addSuffix: true })}</div>
            </div>

            {/* Comment Content */}
            <div className="mb-2">
                {newComment?.content}
            </div>

            {/* Likes, Reply, Upvote */}
            <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-5">
                    <div className="text-sm font-semibold">{comment?.likes?.length} likes</div>
                    <div className="flex space-x-4">
                        <div className="flex gap-5 items-center">
                            <button onClick={handleShowReply} className="text-sm">
                                {newComment?.replies?.length > 1 ? "Replies" : "Reply"} ({newComment?.replies?.length})
                            </button>
                            <Dropdown
                                arrowIcon={false}
                                inline={true}
                                label={<HiDotsHorizontal className="text-lg" />}
                            >
                                {newComment?.author?._id == currentUser?._id && <Dropdown.Item onClick={() => handleEditClick(newComment)}>
                                    Edit
                                </Dropdown.Item>}
                                { newComment?.author?._id == currentUser?._id && <Dropdown.Item onClick={() => handleDeleteClick(newComment)}>
                                    Delete
                                </Dropdown.Item>}
                                <Dropdown.Item onClick={() => setShowPopup(!showPopup)}>
                                    Report
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => handleLikeCommentClick(newComment?._id, currentUser?._id)}
                    className="text-blue-500 font-semibold"
                >
                    {currentUser?.likedComments?.includes(newComment?._id)
                        ? <HiHeart className="text-lg text-red-700" />
                        : <HiOutlineHeart className="text-lg text-black" />}
                </button>
            </div>
            {showReplyBox && showCommentReply[newComment?._id] &&
                <CommentForm 
                    buttonText={"Post Reply"}
                    placeholder={'Write a reply about this comment...'}
                    parent={newComment?._id} 
                    handlePostCommentSubmit={handleReplySubmit} 
                    postCommentContent={replyContent}
                    setPostCommentContent={setReplyContent}
                />}
            {showReplyBox && showCommentReply[newComment?._id] && commentReplies[newComment?._id]?.map((reply, index) => (
                <CommentBox 
                    key={index}
                    comment={reply} 
                    handleLikeCommentClick={handleLikeCommentClick}
                    handleDeleteClick={handleDeleteReplyClick}
                    handleEditClick={handleEditClick}
                    handleReportClick={handleReportClick}
                />
            ))}

            {showEditCommentPopup && <EditCommentBox
                error={error}
                comment={newComment}
                handleEditCommentClick={handleEditCommentClick}
                setEditContent={setEditContent}
                showEditCommentPopup={showEditCommentPopup}
                setShowEditCommentPopup={setShowEditCommentPopup}
             />}
        </div>
    );
};

export default CommentBox;
