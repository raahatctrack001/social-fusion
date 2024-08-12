import React, { useEffect, useState } from 'react'
import AuthorCard from '../Compnents/AuthorCard'
import PostCard from '../Compnents/PostCard'
import { useNavigate, useParams } from 'react-router-dom'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { Button } from 'flowbite-react'
import { HiUserAdd } from 'react-icons/hi'

const Author = () => {
  // const authorData = JSON.parse(localStorage.getItem("authorToDisplay"))
  // const { posts } = authorData;
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [error, setError] = useState();
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();
  
  useEffect(()=>{
      try {
        (async ()=>{
            setError(null);
            const response = await fetch(apiEndPoints.getUserAddress(authorId));
            if(!response.ok){
              setError(response.message)
            }

            const author = await response.json();
            // console.log(author)
            if(author.success){
              setAuthorData(author.data);
            }
        })()
      } catch (error) {
        setError(error)
        console.log("error fetching author!", error)
      }
  }, [])
  // console.log(authorData)
  const postData = authorData?.posts;

  const handlePostSelect = (post) => {
    // localStorage.removeItem("postToDisplay")
    if (!(selectedPost && selectedPost._id === post._id)) {
      localStorage.setItem("postToDisplay", JSON.stringify(post));
      navigate(`/posts/post/${post._id}`)
      setSelectedPost(null); 
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return ( 
    
      <div className='bg-gray-500 m-5 p-2 rounded-lg flex flex-col justify-center items-center'>
        <div className='flex flex-col md:flex-row items-center justify-evenly gap-5 border-2 w-full p-2 '>
          <div className='bg-white rounded-full '>
            <img className='rounded-full h-28 md:h-32 p-1' src={ authorData?.profilePic } alt="" />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 '>
              <span className='md:h-14 items-center border-2 p-2 rounded-lg w-32 flex justify-center font-semibold text-gray-200 '> { authorData?.username } </span>
              <span className='md:h-14 items-center border-2 p-2 rounded-lg w-32 flex justify-center font-semibold text-gray-200 '> status </span>
            </div>
            <div className='flex gap-2'>
              {/* <span className='h-14 items-center border-2 p-2 rounded-lg md:w-32 flex justify-center font-semibold text-gray-200 '> posts {authorData?.posts?.length} </span> */}
              <span className='md:h-14 items-center border-2 p-2 rounded-lg w-32 flex flex-col md:flex-row justify-center font-semibold text-gray-200 '> {authorData?.followings?.length} <span className='ml-2'>followings</span> </span>
              <span className='md:h-14 items-center border-2 p-2 rounded-lg w-32 flex flex-col md:flex-row justify-center font-semibold text-gray-200 '> {authorData?.followers?.length}  <span className='ml-2'>followers</span> </span>

            </div>

          </div>
        </div>

        <div className='border-2 w-full min-h-screen flex flex-col'>
          <span className='md:h-14 items-center border-b-2 p-2  flex flex-col md:flex-row justify-center font-semibold text-gray-200 '> <span className='mr-2'>Total Posts</span> {authorData?.posts?.length} </span>
          {postData && postData.map((post, index) => (
              <div className='p-1 border-2 border-gray-800 rounded-xl w-full md:max-w-96 h-96  bg-gray-300' key={index} >
                {/* <AuthorCard author={post?.author} /> */}
                <div className='flex justify-between '>
                  <div 
                  onClick={
                    ()=>{
                      localStorage.setItem("authorToDisplay", JSON.stringify(post?.author)) 
                      navigate(`authors/author/${post?.author?._id}`)
                      }
                    } className='flex items-center gap-2 cursor-pointer'>                      
                    <img className='h-8 rounded-full' src={post?.author?.profilePic } alt="" />
                    <p className='text-xs font-semibold'> {post?.author?.username } </p>
                  </div>
          
                </div>
                <div onClick={() => handlePostSelect(post)} className='cursor-pointer'>  
                  <PostCard post={post}  />
                </div>
              </div>
          ))}
        </div>  
        


      </div>
  )
}

export default Author