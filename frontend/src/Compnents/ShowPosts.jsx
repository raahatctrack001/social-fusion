import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { Button } from 'flowbite-react'
import NotFoundPage from '../Pages/NotFoundPage'
import { HiCheckCircle, HiPlusCircle, HiUser } from 'react-icons/hi2'
import { HiBadgeCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { current } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { updateSuccess } from '../redux/slices/user.slice'
import LikersPopup from './PostLikersPopup'
import SharePopup from './ShareURL'
import CategoriesPost from './CategorisedPost'
import PageLoader from './PageLoader'

const ShowPosts = ({heading, postData}) => {
    const { currentUser } = useSelector(state=>state?.user)
    const dispatch = useDispatch();
    // //console.log("currentUser", currentUser)
    const navigate = useNavigate();
    // const [likers, setLikers] = useState([]);
    const [showLikers, setShowLikers] = useState({})
    const [postId, setPostId] = useState(null);
    const [share, setShare] = useState(false);
    const [postToShare, setPostToShare] = useState(false);
    const [mountedPosts, setMountedPosts] = useState();
    
    useEffect(()=>{
      setMountedPosts(postData);
    }, [postData])

    const handleToggleFollowButtonClick = async (author)=>{
      // //console.log("post", post);
      // //console.log("currentUser", currentUser);
        
        try {
          fetch(apiEndPoints.toggleFollowUserAddress(author?._id), {
            method: "POST",
            headers: {
              'content-type': 'application/json'
            }
          })
          .then((response)=>{
            //console.log("resonse: ", response);
            return response.json();
          })
          .then((data)=>{
            //console.log("data", data)
              // alert(data.message)
              dispatch(updateSuccess(data?.data?.follower))
              //console.log(data)
          })
        } catch (error) {
            alert(error.message);
            //console.log(error);
        }
      }
      
    const handleShowLikers = async (post)=>{
      setPostId(post?._id);
      setShowLikers({[post?._id]: true})
      // try {
      //   const response = await fetch(apiEndPoints.getLikersOfPost(post?._id));
      //   const data = await response.json();
      //   if(!response.ok){
      //     throw new Error(data?.message || "Network response isn't ok while fetcing likers in show posts")
      //   }

      //   if(data.success){
      //     setLikers(data?.data);
      //     setShowLikers(true);
      //   }
      // } catch (error) {
      //   //console.log(error)
      // }
    }

    if(!mountedPosts){
      <PageLoader />
    }
   
    
  return (
    <div className="container mx-auto p-4">
  <div className="flex flex-col mb-14">
    <div>
      <h1 className="text-center font-bold text-3xl tracking-widest py-4 mt-5"> 
        {heading} 
      </h1>
      
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {mountedPosts?.length ? mountedPosts.map((post, index) => (
        <div className="shadow-lg dark:hover:shadow-white border border-gray-200 dark:border-gray-700 rounded-lg w-full hover:shadow-xl transition duration-300 ease-in-out" key={index}>
          {share && (
            <SharePopup 
              postUrl={`${window.location.href}posts/post/${postToShare?._id}`} 
              onClose={setShare} 
            />
          )}
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
            <div 
              onClick={() => navigate(`authors/author/${post?.author?._id}`)} 
              className="flex items-center gap-2 cursor-pointer">
              <img className="h-10 w-10 rounded-full object-cover" src={post?.author?.profilePic?.at(-1)} alt={post?.author?.username} />
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100"> 
                {post?.author?.username} 
              </p>
            </div>
            {post?.author?._id !== currentUser?._id ? (
              <button 
                onClick={() => handleToggleFollowButtonClick(post?.author)}
                className="border rounded-lg px-3 py-1 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 text-sm font-medium"
                title={currentUser?.followings?.includes(post?.author?._id) ? "Unfollow" : "Follow"} // Tooltip text for follow/unfollow
              >
                {currentUser?.followings?.includes(post?.author?._id) ? (
                  <div className="flex gap-1 items-center">
                    <HiUser className="text-lg" />
                    <HiCheckCircle className="text-red-500 text-xs" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <HiUser className="text-lg mr-1" />
                    <HiPlusCircle className="text-blue-500 text-xs" />
                  </div>
                )}
              </button>
              ) : (
          <button disabled className="text-gray-400 dark:text-gray-500" title="This is you">
            <HiBadgeCheck />
          </button>
        )}

          </div>
          
          <div className="relative group">
            <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <PostCard post={post} />
            </div>
            <div className="absolute bottom-24 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-around p-3 bg-gray-100 dark:bg-gray-700 rounded-b-lg">
              <button 
                onClick={() => handleShowLikers(post)} 
                className="text-sm text-blue-500 dark:text-blue-300">
                Likes ({post?.likes?.length || 0})
              </button>
              <button 
                disabled 
                className="text-sm text-green-500 dark:text-green-300">
                Comments ({post?.comments?.length || 0})
              </button>
              <button 
                onClick={() => { setPostToShare(post); setShare(true); }} 
                className="text-sm text-red-500 dark:text-red-300">
                Share ({[...new Set(post.shares.flatMap(share => share.receivers))].length || 0})
              </button>
            </div>
            {showLikers[post?._id] && (
              <LikersPopup 
                postId={post._id} 
                isHovered={showLikers} 
                setIsHovered={setShowLikers} 
              />
            )}
          </div>
        </div>
      )) : (
        <div className="w-full grid place-items-center">
          <NotFoundPage />
        </div>
      )}
    </div>
  </div>
</div>

  )
}

export default ShowPosts