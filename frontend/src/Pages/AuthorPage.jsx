import React, { useEffect, useState } from 'react'
import AuthorCard from '../Compnents/AuthorCard'
import PostCard from '../Compnents/PostCard'
import { useNavigate, useParams } from 'react-router-dom'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { Button } from 'flowbite-react'
import { HiDocumentAdd, HiUserAdd } from 'react-icons/hi'
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
  }, [ authorId ])
  // console.log(authorData)

  if(!authorData)
    return <NotFoundPage />

  const postData = authorData?.posts;
  // console.log(authorData)
  return (     
      <div className='bg-gray-500 m-5 p-2 rounded-lg flex flex-col justify-center items-center relative md:px-16 lg:px-24 xl:px-28'>
        <AuthorHeader author = {authorData} />
        

        <div className='border-2 w-full min-h-screen flex flex-col rounded-3xl'>
          <span className=' md:h-14 items-center border-b-2 p-2  flex flex-col md:flex-row justify-center font-semibold text-gray-200 '> <span className='mr-2'>Total Posts</span> {authorData?.posts?.length} </span>
          
          {postData.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-5 w-full p-5'>   
            {postData.length && postData.map((post, index) => (
                <div className='p-1 border-2 border-gray-800 rounded-xl min-w-60 bg-gray-300' key={index} >
                  {/* <AuthorCard author={post?.author} /> */}
                  
                  <div onClick={() => navigate(`/posts/post/${post?._id}`)} className='cursor-pointer'>  
                    <PostCard post={post}  />
                  </div>
                </div>

            ))}
          </div> :   
          
            <div className="flex flex-col items-center justify-center border m-2  p-6  shadow-lg md:py-52">
              <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 ">No Posts Yet  </h2>
              <span onClick={()=>navigate("/create-post")} className='flex justify-center items-center gap-2 text-3xl mt-2 md:text-5xl cursor-pointer'> <HiDocumentAdd /> </span>
                <p className="mt-4 text-white italic">
                  "Every great story starts with a blank page. Begin your journey today."
                </p>
                <p className="mt-2 ">
                  Why not start writing your own story? Share your thoughts, ideas, and experiences with the world.
                </p>
              </div>
            </div>}
        </div>        


      </div>
  )
}

export default Author
