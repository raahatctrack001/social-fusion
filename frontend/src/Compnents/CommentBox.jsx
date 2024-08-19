import { formatDistanceToNow } from 'date-fns';
import { Dropdown } from 'flowbite-react';
import React, { useState } from 'react';
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import CommentForm from './CommentForm';
import { updateSuccess } from '../redux/slices/user.slice';

const CommentBox = ({ comment, handleLikeCommentClick }) => {
    const { currentUser } = useSelector(state => state.user);
    const [showCommentReply, setShowCommentReply] = useState(comment?.replies || []);
    const [commentReplies, setCommentReplies] = useState(comment?.replies || []);
    const [replyContent, setReplyContent] = useState('');
    const [showReplyBox, setShowReplyBox] = useState(false);
    const dispatch = useDispatch();
    
    const handleReportClick = ()=>{

    }
    const handleEditClick = ()=>{

    }
    const handleDeleteClick = ()=>{

    }
    
    const handleReplyClick = async () => {
        setShowReplyBox(!showReplyBox);
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
                const newReply = data?.data?.newReply;
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
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-2 border-black p-3 my-2 rounded-lg">
            {/* Username and Timestamp */}
            <div className="flex justify-between items-center mb-2 border-b border-black">
                <Link to={`/authors/author/${comment?.author?._id}`} className="font-semibold">{comment?.author?.username}</Link>
                <div className="text-sm text-gray-500">{formatDistanceToNow(new Date(comment?.updatedAt) || new Date(), { addSuffix: true })}</div>
            </div>

            {/* Comment Content */}
            <div className="mb-2">
                {comment?.content}
            </div>

            {/* Likes, Reply, Upvote */}
            <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-5">
                    <div className="text-sm font-semibold">{comment?.likes?.length} likes</div>
                    <div className="flex space-x-4">
                        <div className="flex gap-5 items-center">
                            <button onClick={handleReplyClick} className="text-sm text-gray-500">
                                {comment?.replies?.length > 0 ? "Replies" : "Reply"} ({comment?.replies?.length})
                            </button>
                            <Dropdown
                                arrowIcon={false}
                                inline={true}
                                label={<HiDotsHorizontal className="text-lg text-gray-500" />}
                            >
                                <Dropdown.Item onClick={() => handleEditClick(comment)}>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDeleteClick(comment)}>
                                    Delete
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleReportClick(comment)}>
                                    Report
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => handleLikeCommentClick(comment?._id, currentUser?._id)}
                    className="text-blue-500 font-semibold"
                >
                    {currentUser?.likedComments?.includes(comment?._id)
                        ? <HiHeart className="text-lg text-red-700" />
                        : <HiOutlineHeart className="text-lg text-black" />}
                </button>
            </div>
            {showReplyBox && showCommentReply[comment?._id] &&
                <CommentForm 
                    parent={comment?._id} 
                    handlePostCommentSubmit={handleReplySubmit} 
                    postCommentContent={replyContent}
                    setPostCommentContent={setReplyContent}
                />}
            {showReplyBox && showCommentReply[comment?._id] && commentReplies[comment?._id]?.map((reply, index) => (
                <CommentBox 
                    key={index}
                    comment={reply} 
                    handleLikeCommentClick={handleLikeCommentClick}
                />
            ))}
        </div>
    );
};

export default CommentBox;
