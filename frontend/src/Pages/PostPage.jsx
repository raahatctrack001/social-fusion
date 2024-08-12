import React, { useEffect, useState } from 'react'
import PostCard from '../Compnents/PostCard';
import { Button } from 'flowbite-react';
import { HiUserAdd } from 'react-icons/hi';
import { Navigate, useNavigate } from 'react-router-dom';

const PostPage = () => {
  const postData = JSON.parse(localStorage.getItem("postToDisplay"));
  const navigate = useNavigate();
  console.log(postData)
  // const [post, setPost] = useState(postData);

  const calculateReadingTime = (wordsPerMinute = 250) => {
    const text = postData.content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    const readingTime = wordCount / wordsPerMinute;
    return Math.ceil(readingTime);
  };

  const lastUpdatedAt = ()=>{
    const mongoDate = postData?.updatedAt;
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

  const handleAuthorClick = ()=>{
    localStorage.setItem("authorToDisplay", JSON.stringify(postData?.author))
    navigate(`/authors/author/${postData?.author?._id}`)
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='m-5 md:mx-16 lg:mx-28 xl:mx-52'>
      <h1 className='font-bold text-xl md:text-3xl font-serif mb-3 border-b-2'> { postData.title } </h1>

      <div>
        <div className='flex gap-2 items-center pb-2' onClick={handleAuthorClick}>
          <img className='h-10 rounded-full' src={postData?.author?.profilePic} alt="" />
          <div className='flex w-full flex-col text-xs cursor-pointer'>
            <span className=''>{postData?.author?.username} </span>
            <span className=''>{postData?.author?.fullName} </span>
          </div>
          <Button className='bg-gray-800'> <span className='flex justify-center items-center'> <HiUserAdd className='mr-1' /> </span> Follow </Button>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between border-b-2'>
          <p className=''> <span className='hidden md:inline'> Approx<span className='hidden lg:inline'>imate </span> time: </span> {calculateReadingTime()} min read </p>
            <span className='hidden md:inline text-2xl lg:hidden'>|</span>
          <p className=''> <span className='hidden md:inline'> Last Update: </span> {lastUpdatedAt()}  </p>
        </div>
      </div>
    <div className='border-2'>
        <img src={postData?.imagesURLs[0]?.url} alt="" />
        <p className='w-full flex justify-center md:text-xl font-semibold my-3'> {postData?.imagesURLs[0]?.original_filename} </p>
      </div>
      <p className='mt-5'> { postData.content } </p>
    </div>
  )
}

export default PostPage
