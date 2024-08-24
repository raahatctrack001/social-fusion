import React, { useEffect, useState } from 'react'
import AuthorCard from '../Compnents/AuthorCard'
import PostCard from '../Compnents/PostCard'
import { useNavigate, useParams } from 'react-router-dom'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { Button } from 'flowbite-react'
import { HiDocumentAdd, HiUserAdd } from 'react-icons/hi'
import NotFoundPage from './NotFoundPage'
import AuthorHeader from '../Compnents/AuthorHeader'
import LoaderPopup from '../Compnents/Loader'
import PageLoader from '../Compnents/PageLoader'

const Author = () => {
  const { authorId } = useParams();
  const [postData, setPostData] = useState();
  const [authorData, setAuthorData] = useState(null);
  const [error, setError] = useState();
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
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
              setPostData(author?.data?.posts)
            }
        })()
      } catch (error) {
        setError(error)
        console.log("error fetching author!", error)
      }
  }, [ authorId ])
  // console.log(authorData)

 
  if(!authorData){
    return <PageLoader />
  }
  // console.log(authorData)
  return (     
      <div className='m-5 p-2 rounded-lg flex flex-col justify-center items-center relative md:px-16 lg:px-24 xl:px-28'>
        <AuthorHeader author = {authorData} setAuthor={setAuthorData}/>
        

        <div className='border-2 w-full min-h-screen flex flex-col rounded-3xl'>
          <span className=' md:h-14 items-center border-b-2 p-2  flex flex-col md:flex-row justify-center font-semibold'> <span className='mr-2'>Total Posts</span> {authorData?.posts?.length} </span>
          
          {postData.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-5 w-full p-5'>   
            {postData.length && postData.map((post, index) => (
                <div className='p-1 border-2 border-gray-800 rounded-xl max-w-80 max-h-96 shadow-xl hover:shadow-white overflow-hidden' key={index} >
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
                <p className="mt-4  italic">
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
