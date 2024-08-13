import React, { useEffect, useState } from 'react'
import AuthorCard from '../Compnents/AuthorCard'
import PostCard from '../Compnents/PostCard'
import { useNavigate, useParams } from 'react-router-dom'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { Button } from 'flowbite-react'
import { HiUserAdd } from 'react-icons/hi'
import NotFoundPage from './NotFoundPage'
import AuthorHeader from '../Compnents/AuthorHeader'

const Author = () => {
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

  if(!authorData)
    return <NotFoundPage />

  const postData = authorData?.posts;

  return (     
      <div className='bg-gray-500 m-5 p-2 rounded-lg flex flex-col justify-center items-center relative'>
        <AuthorHeader author = {authorData} />
        

        <div className='border-2 w-full min-h-screen flex flex-col rounded-3xl'>
          <span className=' md:h-14 items-center border-b-2 p-2  flex flex-col md:flex-row justify-center font-semibold text-gray-200 '> <span className='mr-2'>Total Posts</span> {authorData?.posts?.length} </span>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-5 w-full p-5'>   
            {postData && postData.map((post, index) => (
                <div className='p-1 border-2 border-gray-800 rounded-xl min-w-60 bg-gray-300' key={index} >
                  {/* <AuthorCard author={post?.author} /> */}
                  
                  <div onClick={() => navigate(`/posts/post/${post?._id}`)} className='cursor-pointer'>  
                    <PostCard post={post}  />
                  </div>
                </div>
            ))}
          </div>
        </div>  
        


      </div>
  )
}

export default Author
