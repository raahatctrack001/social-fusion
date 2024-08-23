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
     try {
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
            setComments(
                data?.data?.currentPost?.comments
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []
            );
            dispatch(updateSuccess(data?.data?.currentUser));
            console.log(data);
        }
     } catch (error) {
        console.log(error);
     }
  }
  
  const handleEditPostCommentClick = async()=>{

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
  const handleReplyCommentClick = async()=>{

  }
  
  return (
    <div>
        {loading && <PageLoader info={"updating data!"} />}
        <div className='w-full dark:border-white p-2 mt-2 rounded-lg'>
            <CommentForm 
                commentContent={commentContent} 
                setCommentContent={setCommentContent} 
                handleCommentSubmit={handlePostCommentSubmit}           
            />

            <div>
             {comments?.length > 0 && comments?.map((comment, index)=><div className='border-2 rounded-lg my-2' key={index}> 
                    <CommentBox                     
                        comment={comment} 
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