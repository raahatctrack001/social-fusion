import React, { useState } from 'react'
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

    
  return (
    <div>
        <div className='flex-3/4 flex flex-col m-2 px-2 mb-14'>
        <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> {heading} </h1>
        <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5  p-2 ml-20">
        {postData?.length ? postData.map((post, index) => ( //handle the edge case if there's not post
              <div className=' shadow-2xl dark:hover:shadow-white border hover:shadow-black rounded-xl w-full md:max-w-96 h-full' key={index} >
                {/* <AuthorCard author={post?.author} /> */}
                {share && <SharePopup postUrl={`${window.location.href}posts/post/${postToShare?._id}`} onClose={setShare}/>}
                <div className='flex justify-between hover:dark:bg-gray-700 hover:bg-gray-100 p-2 rounded-lg '>
                  <div 
                  onClick={
                    ()=>{
                      navigate(`authors/author/${post?.author?._id}`)
                      }
                    } className='flex items-center gap-2 cursor-pointer'>                      
                    <img className='h-8 rounded-full' src={post?.author?.profilePic.at(-1) } alt="" />
                    <p className='text-xs font-semibold'> {post?.author?.username } </p>
                  </div>

                {post?.author && post?.author?._id !== currentUser?._id ? 
                (<button 
                  onClick={()=>handleToggleFollowButtonClick(post?.author)}
                  outline="true" className=' border rounded-lg px-4 hover:bg-gray-300 hover:dark:bg-gray-900'> 
                                              {/* {author?.followers?.includes(currentUser?._id) ?  */}
                                              {currentUser?.followings?.includes(post?.author?._id)?
                                              ( <div className='flex gap-1 items-center relative'> <HiUser className='text-lg'/> <HiCheckCircle className='relative bottom-1 right-2 text-xs' />  </div> ) : 
                                              (<div className='flex items-center justify-center'> <HiUser className='text-lg mr-1' /> <HiPlusCircle className='text-xs relative right-2 bottom-1'/>  </div>)}  
                </button>) : 
                
                (<Button disabled> <HiBadgeCheck /> </Button>)}                  
                
                </div>
                <div className="relative group max-w-sm p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 object-contain ">  
                    <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-around p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                      <button onClick={()=>handleShowLikers(post)} className=" cursor-pointer text-blue-500 dark:text-blue-300">Likes {post?.likes?.length || 0}</button>
                      <button disabled className="cursor-not-allowed text-green-500 dark:text-green-300">Comment { post?.comments?.length || 0}</button>
                      <button onClick={()=>{setPostToShare(post), setShare(true)}} className=" text-red-500 dark:text-red-300">Share {post?.shares?.length || 0}</button>
                    </div>
                  {showLikers[post?._id] && <LikersPopup postId={postId} isHovered={showLikers} setIsHovered={setShowLikers} />}
                  <PostCard post={post}  />
                </div>
              </div>
          )) : <div className='w-full justify-center items-center'> <NotFoundPage /> </div>}
      </div>
    </div>
    </div>
  )
}

export default ShowPosts