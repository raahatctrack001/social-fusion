import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import PostCard from '../Compnents/PostCard'
import NotFoundPage from './NotFoundPage'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { apiEndPoints } from '../apiEndPoints/api.addresses'

const SearchPostResult = () => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);
    
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    
    // console.log(query)
    useEffect(()=>{
        try {
            fetch(apiEndPoints.searchPostsAddress(query), {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then((response)=>{
                    console.log("response", response)
                    // if(!response.ok){
                    //     alert(response.message);
                    // }
                    return response.json();
                })
                .then((data)=>{
                    
                    setPostData(data.posts);
            
                    
                })
        } catch (error) {   
            console.log(error);
        }
    }, [query])

    console.log("inside searchedPostResult page, ", postData)
    console.log("query", query)

  return (
    <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
        <div className='flex-3/4 flex flex-col border-2  m-2 px-2'>
            <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Recent Posts </h1>
            <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 bg-gray-100 gap-5 ">
            {postData?.length ? postData.map((post, index) => ( //handle the edge case if there's not post
                  <div className='p-1 border-2 border-gray-800 rounded-xl w-full md:max-w-96 h-96  bg-gray-300' key={index} >
                    {/* <AuthorCard author={post?.author} /> */}
                    <div className='flex justify-between '>
                      <div 
                      onClick={
                        ()=>{
                          navigate(`/authors/author/${post?.author?._id}`)
                          }
                        } className='flex items-center gap-2 cursor-pointer'>                      
                        <img className='h-8 rounded-full' src={post?.author?.profilePic } alt="" />
                        <p className='text-xs font-semibold'> {post?.author?.username } </p>
                      </div>
                      <Button 
                          onClick={()=>console.log("follow button from post got a click")}
                          outline pill> <HiUserAdd /> </Button>
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

export default SearchPostResult