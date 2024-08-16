import React, { useState } from 'react'
import PostCard from './PostCard'
import { Button } from 'flowbite-react'
import NotFoundPage from '../Pages/NotFoundPage'
import { HiCheckCircle, HiPlusCircle, HiUser } from 'react-icons/hi2'
import { HiBadgeCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const ShowPosts = ({heading, postData}) => {
    const { currentUser } = useState(state=>state?.user)
    const navigate = useNavigate();
  return (
    <div>
        <div className='flex-3/4 flex flex-col border-2  m-2 px-2'>
        <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> {heading} </h1>
        <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 bg-gray-600 gap-5  p-2">
        {postData?.length ? postData.map((post, index) => ( //handle the edge case if there's not post
              <div className='p-1 border-2 border-gray-800 rounded-xl w-full md:max-w-96 h-96  bg-gray-300  dark:bg-gray-900' key={index} >
                {/* <AuthorCard author={post?.author} /> */}
                <div className='flex justify-between '>
                  <div 
                  onClick={
                    ()=>{
                      navigate(`authors/author/${post?.author?._id}`)
                      }
                    } className='flex items-center gap-2 cursor-pointer'>                      
                    <img className='h-8 rounded-full' src={post?.author?.profilePic } alt="" />
                    <p className='text-xs font-semibold'> {post?.author?.username } </p>
                  </div>
                  {post?.author?._id !== currentUser?._id ? 
                  (<Button 
                    onClick={()=>handleToggleFollowButtonClick(post?.author)}
                    outline className='bg-gray-800 '> 
                                                {post?.author?.followers?.includes(currentUser?._id) ? 
                                                ( <div className='flex gap-1 items-center relative'>  <HiUser className='text-lg'/> <HiCheckCircle className='relative bottom-1 right-2 text-xs' /> </div> ) : 
                                                (<div className=''><span className='flex items-center justify-center gap-1 relative'> <HiUser className='text-lg' /> <HiPlusCircle className='text-xs relative right-2 bottom-1'/> </span></div>)}  
                </Button>) : 
                
                (<Button outline disabled> <HiBadgeCheck className='text-lg text-black' /> </Button>)}
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