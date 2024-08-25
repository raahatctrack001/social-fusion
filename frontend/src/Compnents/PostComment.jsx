import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import LoaderPopup from './Loader';
import CommentBox from './CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import { updateSuccess } from '../redux/slices/user.slice';
import PageLoader from './PageLoader';

const PostComment = ({ post }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const { currentUser } = useSelector(state=>state.user);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [error, setError] = useState('')
  useEffect(()=>{
    const getComments = async ()=>{
        try {
            const response = await fetch(apiEndPoints.getCommentsOnPostAddress(post?._id));
            const data = await response.json();
            console.log(data)
            console.log(response)
            if(!response.ok){
                throw new Error(data?.message || "Network response isn't ok while fetchnig post comments!")
            }
    
            if(data.success){
                setLoading(false);
                setComments(data?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []);
            }
        } catch (error) {
            console.log(error);
        }
    }
    getComments();
  }, [])

  const handlePostCommentSubmit = async(e)=>{
     e.preventDefault();
     setLoading(true)
     try {
        setError('')
        const formData = new FormData();
        formData.append("content", commentContent);
        const response = await fetch(apiEndPoints.createCommentAddress(post?._id, currentUser?._id), {
           method: "POST",
           body: formData
        })
   
        const data = await response.json();
        if(!response.ok){
           throw new Error(data?.message || "Network response isn't ok while submitting post comment")
        }

        if(data.success){
            setCommentContent('')
            // const updatedComment = 
            setComments(prev => 
                [...prev, data?.data?.newComment]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              );
                          
            dispatch(updateSuccess(data?.data?.currentUser));
            // setCommentContent('')
            console.log(data);
        }
     } catch (error) {
        setError(error.message)
        console.log(error);
     }
     finally{
        setLoading(false);
     }
  }
  
  const handleEditPostCommentClick = async(comment, editedContent)=>{
    
    try {
        setLoading(true)
        setError('')
        const formData = new FormData();
        formData.append("editedContent", editedContent)
        const response = await fetch(apiEndPoints.updateCommentAddress(comment?._id), {method: "PATCH", body: formData});
        const data = await response.json();
        
        if(!response.json()){
            throw new Error(data?.message || "Network response isn't ok while editing main comments");
        }

        if(data?.success){
            const editedComment = data?.data;
            const updatedComments = comments?.map((comment)=>comment?._id === editedComment?._id ? editedComment : comment)
            setComments(updatedComments);            
        }
    } catch (error) {
        setError(error.message)
        console.log()
    }
    finally{
        setLoading(false)
    }
  }

  const handleDeletePostCommentClick = async(commentId)=>{
    // console.log("comment to delete", comment)
    setLoading(true)
    try {
        const response = await fetch(apiEndPoints.deleteCommentAddress(commentId), {method: "DELETE"});
        const data = await response.json();
        if(!response.ok){
            throw new Error(data?.message || "Network response isn't ok in delete comment submit");
        }

        if(data?.success){
            console.log("deletedComment", data)
            setComments((comments)=>comments?.filter(comment=>comment?._id !== data?.data?._id))
        }
    } catch (error) {
        console.log(error)
    }
    finally{
        setLoading(false)
    }

  }

  const handlReportPostCommentClick = async()=>{

  }

  const handleLikeCommentClick = async(commentId)=>{
    
    try {
        const response = await fetch(apiEndPoints.likeCommentAddress(commentId, currentUser?._id), {method: "POST"});
        const data = await response.json();
        if(!response.ok){
            throw new Error(data?.message || "Network response isn't ok while like the comment")
        }

        if(data.success){
            const likedComment = data?.data?.comment;

            const newComments = comments.map((comment)=>{
                return comment?._id === likedComment?._id ? likedComment  : comment
            })
            setComments(newComments)

            dispatch(updateSuccess(data?.data?.currentUser));
            console.log("data", data);
            console.log("current comments", comments);
        }
    } catch (error) {
        console.log(error)
    }

  }

  const handleReplyCommentClick = async(comment)=>{
    console.log("replying on commment", comment);
  }

  const handleShowReplies = async ()=>{

  }

  
  
  return (
    <div>
        {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"updating Comments!"} />}
        <div className='w-full dark:border-white p-2 mt-2 rounded-lg'>
           <CommentForm 
                error={error}
                keepX={false}
                placeholder={"Write a comment about this post..."}
                buttonText={"Post Comment"}
                commentContent={commentContent} 
                setCommentContent={setCommentContent} 
                handleCommentSubmit={handlePostCommentSubmit}           
            />

            <div>
             {comments?.length > 0 && comments?.map((comment, index)=><div className='border-2 p-1 pr-3 rounded-lg my-1' key={index}> 
                    <CommentBox                     
                        comment={comment}   
                        comments={comments}
                        setComments={setComments}                      
                        handleLikeClick={handleLikeCommentClick}
                        handleDeleteClick={handleDeletePostCommentClick}
                        handleReplyClick={handleReplyCommentClick}
                        handleEditClick={handleEditPostCommentClick}
                        handleReportClick={handlReportPostCommentClick}
                    />
                </div>)}
            </div>
        </div>
    
    
    </div>
  )
}

export default PostComment