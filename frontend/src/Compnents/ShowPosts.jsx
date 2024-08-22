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

const ShowPosts = ({heading, postData}) => {
    const { currentUser } = useSelector(state=>state?.user)
    const dispatch = useDispatch();
    console.log("currentUser", currentUser)
    const navigate = useNavigate();


    const handleToggleFollowButtonClick = async (author)=>{
      // console.log("post", post);
      // console.log("currentUser", currentUser);
        
        try {
          fetch(apiEndPoints.toggleFollowUserAddress(author?._id), {
            method: "POST",
            headers: {
              'content-type': 'application/json'
            }
          })
          .then((response)=>{
            console.log("resonse: ", response);
            return response.json();
          })
          .then((data)=>{
            console.log("data", data)
              // alert(data.message)
              dispatch(updateSuccess(data?.data?.follower))
              console.log(data)
          })
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
      }
  return (
    <div>
        <div className='flex-3/4 flex flex-col m-2 px-2'>
        <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> {heading} </h1>
        <div className="flex flex-col  justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-5  p-2">
        {postData?.length ? postData.map((post, index) => ( //handle the edge case if there's not post
              <div className='p-1 shadow-2xl hover:shadow-white border hover:shadow-2xl rounded-xl w-full md:max-w-96 h-96 ' key={index} >
                {/* <AuthorCard author={post?.author} /> */}
                <div className='flex justify-between hover:dark:bg-gray-700 hover:bg-gray-100 p-2 rounded-lg '>
                  <div 
                  onClick={
                    ()=>{
                      navigate(`authors/author/${post?.author?._id}`)
                      }
                    } className='flex items-center gap-2 cursor-pointer'>                      
                    <img className='h-8 rounded-full' src={post?.author?.profilePic } alt="" />
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
                <div className='cursor-pointer' onClick={()=>navigate(`/posts/post/${post?._id}`)}>  
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