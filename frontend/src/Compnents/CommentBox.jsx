import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { HiChat, HiDotsHorizontal, HiOutlineThumbUp, HiThumbUp } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns';
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import LoaderPopup from './Loader';
import { updateSuccess } from '../redux/slices/user.slice';
import EditCommentPopup from './EditCommentPopup';

const CommentBox = ({ 
    comment, 
    comments,
    setComments,
    handleReplyClick,
    handleEditClick,
    handleDeleteClick,
    handleReportClick,
    handleLikeClick,
    handleShowReplies

}) => {
    const { currentUser } = useSelector(state=>state.user);
    // const [currentComment, setCurrentComment] = useState(comment);
    const [showReplies, setShowReplies] = useState(true);
    const [currentReplies, setCurrentReplies] = useState();
    const [commentReplies, setCommentReplies] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [editCommentContent, setEditCommentContent] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleToggleShowReplyClick = ()=>{
        setShowReplies(!showReplies);
        handleShowRepliesClick()
    }
    const handleShowRepliesClick = async ()=>{
        // setShowReplies(!showReplies);
        
            setLoading(true)
            try {
                const response = await fetch(apiEndPoints.getCommentAddress(comment?._id));
                const data = await response.json();
                if(!response.ok){
                    throw new Error(data?.message || "Network reponse isn't ok while getting replies of a comment")
                }

                if(data?.success){
                    console.log("comment replies", data)
                    
                    setCommentReplies(prev=>({...prev, [comment?._id]: data?.data || []}))
                    console.log(commentReplies)
                }
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false)
            }
        
    }

    const handleReplySubmitButtonClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("content", replyContent);
    
            const response = await fetch(apiEndPoints.replyCommentAddress(comment?._id, currentUser?._id), {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.message || "Network response isn't ok from reply comment component!");
            }
    
            if (data.success) {
                console.log("reply data", data);
                const parent = data?.data?.parent;
                setCommentReplies(prev=>({...prev, [parent?._id]: parent.replies.sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt)) || []}))
                setShowReplies(false)
                console.log("rendered comment: ", commentReplies)
                setReplyContent('')
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    };
    
    const handleReplyLikeCommentClick = async(commentId)=>{
        setLoading(true)
        try {
            const response = await fetch(apiEndPoints.likeCommentAddress(commentId, currentUser?._id), {method: "POST"});
            const data = await response.json();
            if(!response.ok){
                throw new Error(data?.message || "Network response isn't ok while like the comment")
            }
    
            if(data.success){
                // const likedComment = data?.data?.comment;
    
                // const newCommentReplies = commentReplies.map((comment)=>{
                //     return comment?._id === likedComment?._id ? likedComment  : comment
                // })
                // setCommentReplies(newCommentReplies)
                dispatch(updateSuccess(data?.data?.currentUser));
                handleShowRepliesClick();
                console.log("data", data);
                console.log("current comments", comments);
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    
      }
    
    const handleDeleteReply = async (commentId)=>{
        setLoading(true)
        try {
            const response = await fetch(apiEndPoints.deleteCommentAddress(commentId), {method: "DELETE"});
            const data = await response.json();
            if(!response.ok){
                throw new Error(data?.message || "Network response isn't ok in delete comment submit");
            }
    
            if(data?.success){
                console.log("deletedComment", data)
                handleShowRepliesClick();
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    const handleEditFormSubmit = (editedContent)=>{
        handleEditClick(comment, editedContent);
    }

    const handleReplyEdit = async (comment, editedContent)=>{
        console.log("handlReplyEdit", comment);
        console.log("handlereplyEdit", editedContent);

        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("editedContent", editedContent)
            const response = await fetch(apiEndPoints.updateCommentAddress(comment?._id), {method: "PATCH", body: formData});
            const data = await response.json();
            
            if(!response.json()){
                throw new Error(data?.message || "Network response isn't ok while editing main comments");
            }
    
            if(data?.success){
                console.log("reply edited", data)
                handleShowRepliesClick();               
            }
        } catch (error) {
            console.log()
        }
        finally{
            setLoading(false)
        }
    }
    console.log("edit comment click", editCommentContent)
    return (
        <div className="w-full p-4 dark:bg-[rgb(16,23,42)] rounded-lg shadow-md dark:text-white m-1">
            {/* Top Row: Username and Time */}
            
            {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"Updating Comments"} />}
            <div className="flex justify-between items-center mb-2">
                <div className='flex gap-3'> <span className="font-semibold">{comment?.author?.username}</span> {comment?.edited && <span className='font-semibold text-red-600'> edited</span>} </div>
                <span className="text-sm text-gray-400">{formatDistanceToNow(comment?.createdAt, {addSuffix: true})}</span>
            </div>

            {/* Middle Row: Comment Content */}
            <div className="mb-2">
                <p>{comment?.content}</p>
            </div>

            {/* Bottom Row: Like, Reply, and Options */}
            <div className="flex justify-between items-center">
                <div className='flex gap-5'>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 cursor-pointer" onClick={()=>handleLikeClick(comment?._id)}>
                            {currentUser?.likedComments?.includes(comment?._id) ? <HiThumbUp className="w-5 h-5 text-blue-500" /> : <HiOutlineThumbUp className="w-5 h-5 text-blue-500" />}
                            <span>{comment?.likes?.length}</span>
                        </div>
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <HiChat className="w-5 h-5 text-blue-500" />
                            <span>{commentReplies[comment?._id]?.length||comment?.replies?.length}</span>
                        </div>
                    </div>
                    <div className="relative flex gap-5">
                        <div className='cursor-pointer' onClick={handleToggleShowReplyClick}>
                            { commentReplies[comment?._id]?.length || comment?.replies?.length ? (showReplies ? <span>show replies</span> : <span> hide replies </span>) : <span> </span>}
                        </div>
                        <Dropdown
                            label={<HiDotsHorizontal className="w-5 h-5 cursor-pointer" />}
                            arrowIcon={false}
                            inline={true}
                            className="text-black dark:text-white"
                        >
                            <Dropdown.Item onClick={()=>setShowReplyForm(!showReplyForm)}>
                                Reply
                            </Dropdown.Item>
                            {currentUser?._id === comment?.author?._id && <Dropdown.Item onClick={()=>setShowEditForm(!showEditForm)}>
                                Edit
                            </Dropdown.Item>}
                            {currentUser?._id === comment?.author?._id && <Dropdown.Item onClick={()=>handleDeleteClick(comment?._id)}>
                                Delete
                            </Dropdown.Item>}
                            <Dropdown.Item onClick={handleReplyClick}>
                                Report
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <button
                        onClick={()=>handleLikeClick(comment?._id)}
                        className="hidden md:flex items-center space-x-1 text-blue-500 hover:underline focus:outline-none"
                    >
                        {currentUser?.likedComments?.includes(comment?._id) ? <div><HiThumbUp className="w-5 h-5" />
                        <span>Liked</span></div> :

                        <div><HiOutlineThumbUp className="w-5 h-5" />
                        <span>Like</span></div>}

                         
                    </button>
                </div>
            </div>
                {showReplyForm && <CommentForm
                    keepX={true}
                    setShowCommentForm={setShowReplyForm}
                    placeholder={"Write a reply about this comment..."}
                    buttonText={"Post Reply"}
                    commentContent={replyContent}
                    setCommentContent={setReplyContent}
                    handleCommentSubmit={handleReplySubmitButtonClick}
                />}
                {showEditForm && <EditCommentPopup
                        placeholder={"edit Comment..."}
                        buttonText={"Edit Comment"}
                        keepX={true}
                        commentContent={comment?.content}
                        setShowCommentForm={setShowEditForm}
                        setCommentContent={setEditCommentContent}
                        handleCommentSubmit={handleEditFormSubmit}
                     /> 
                    }

                {!showReplies && 
                    commentReplies[comment?._id] && 
                    commentReplies[comment?._id].map((comment, index)=>
                    <CommentBox key={index} 
                        comment={comment}
                        handleLikeClick={handleReplyLikeCommentClick}  
                        handleEditClick={handleReplyEdit}
                        handleDeleteClick={handleDeleteReply}  
                    />)}
        </div>
    );
};

export default CommentBox;
