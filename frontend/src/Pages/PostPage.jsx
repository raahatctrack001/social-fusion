import React, { useEffect, useState } from 'react'
import PostCard from '../Compnents/PostCard';
import { Button } from 'flowbite-react';
import { HiUserAdd } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import NotFoundPage from './NotFoundPage';
import DisplayContent from '../Compnents/DisplayContent';

const PostPage = () => {
  const { postId } = useParams();

  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();
  const [error, setError] = useState(null);


  useEffect(()=>{
    try {
      (async ()=>{
          // setError(null);
          const response = await fetch(apiEndPoints.getPostAddress(postId));
          // if(!response.ok){
          //   setError(response.message)
          // }

          const post = await response.json();
          console.log(post.data)
          if(post.success){
            setPost(post?.data);
            setAuthor(post?.data?.author)
          }
      })()
    } catch (error) {
      // setError(error)
      console.log("error fetching author!", error)
    }
}, [])

  if(!post)
    return <NotFoundPage />

  const calculateReadingTime = (content, wordsPerMinute = 250) => {
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    const readingTime = wordCount / wordsPerMinute;
    return Math.ceil(readingTime);
  };

  const lastUpdatedAt = ()=>{
    const mongoDate = post?.updatedAt;
    const date = new Date(mongoDate);
    const formattedDate = date.toLocaleString('en-US', {
      weekday: 'long', // "Monday"
      year: 'numeric', // "2024"
      month: 'long', // "August"
      day: 'numeric', // "12"
      hour: 'numeric', // "8 AM"
      minute: 'numeric', // "00"
      second: 'numeric', // "00"
      timeZoneName: 'short' // "GMT"
    });
    return formattedDate
  } 

  // console.log("post fetched", post)
  // // const { author } = post;
  return (
    <div className='m-5 md:mx-16 lg:mx-28 xl:mx-52'>
      <h1 className='font-bold text-xl md:text-3xl font-serif mb-3 border-b-2'> { post.title } </h1>

      <div>
        <div className='flex gap-2 items-center pb-2' onClick={()=>navigate(`/authors/author/${post?.author?._id}`)}>
          <img className='h-10 rounded-full' src={author?.profilePic} alt="" />
          <div className='flex w-full flex-col text-xs cursor-pointer'>
            <span className=''>{author?.username} </span>
            <span className=''>{author?.fullName} </span>
          </div>
          <Button className='bg-gray-800'> <span className='flex justify-center items-center'> <HiUserAdd className='mr-1' /> </span> Follow </Button>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between border-b-2'>
          <p className=''> <span className='hidden md:inline'> Approx<span className='hidden lg:inline'>imate </span> time: </span> {calculateReadingTime(post?.content)} min read </p>
            <span className='hidden md:inline text-2xl lg:hidden'>|</span>
          <p className=''> <span className='hidden md:inline'> Last Update: </span> {lastUpdatedAt()}  </p>
        </div>
      </div>
      <div className='border-2 flex justify-center items-center text-xl py-3 font-semibold'>
        {post.category}
        {/* <img src={post?.imagesURLs[0]?.url} alt="" /> */}
        {/* <p className='w-full flex justify-center md:text-xl font-semibold my-3'> {post?.imagesURLs[0]?.original_filename} </p> */}
      </div>
        <DisplayContent content={post?.content} />
    </div>
  )
}


export default PostPage
