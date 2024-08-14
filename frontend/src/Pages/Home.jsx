import React, { useEffect, useState } from 'react'
import PostCard from '../Compnents/PostCard'
import AuthorCard from '../Compnents/AuthorCard'
import authorData from '../dataSeeders/authorData'
import { shuffle } from 'lodash'
import { testPosts } from '../dataSeeders/post50'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { HiBadgeCheck, HiCheckCircle, HiPlusCircle, HiUser, HiUserAdd, HiUserRemove } from 'react-icons/hi'
import NotFoundPage from './NotFoundPage'
import { useSelector } from 'react-redux'

const Home = () => {
  const { currentUser } = useSelector(state=>state.user)
  const [postData, setPostData] = useState([]);
  const [users, setUsers] = useState([]); 

  const navigate = useNavigate();

  useEffect(()=>{
    fetch(apiEndPoints.getPostsAddress())
      .then((posts)=>{
        if(!posts){
          throw new Error("network response wasn't ok!");
        }
        return posts.json()
      })
      .then((data)=>{
        const fetchedData = data.data;
        console.log("fetched post"); 
        setPostData(fetchedData)
      })
      .catch((err)=>{
        throw new Error("Error fetching posts", err);
      })
  }, [])


  useEffect(()=>{
    fetch(apiEndPoints.getUsersAddress())
      .then((users)=>{
        if(!users){
          throw new Error("error getting author's detail")
        }

        return users.json();
      })
      .then((data)=>{
        console.log("fetched user")
        // console.log(data);
        setUsers(data.data);
      })
      .catch((error)=>{
        throw new Error("error getting author's detail! ", error)
      })
  }, [])

  const handleToggleFollowButtonClick = async (author)=>{
    try {
      fetch(apiEndPoints.toggleFollowUserAddress(author._id), {
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
          alert(data.message)
          // if(data.success){
          //   currentUser?.followers = data.followers;
          //   currentUser?.followings = data.followings;
          // }
          console.log(data)
      })
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }
  
  return (
  <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
    <div className='flex-3/4 flex flex-col border-2  m-2 px-2'>
        <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Recent Posts </h1>
        <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 bg-gray-100 gap-5 ">
        {postData.length ? postData.map((post, index) => ( //handle the edge case if there's not post
              <div className='p-1 border-2 border-gray-800 rounded-xl w-full md:max-w-96 h-96  bg-gray-300' key={index} >
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
                <div className='cursor-pointer' onClick={()=>navigate(`posts/post/${post?._id}`)}>  
                  <PostCard post={post}  />
                </div>
              </div>
          )) : <div className='w-full justify-center items-center'> <NotFoundPage /> </div>}
      </div>
    </div>




    <div className='flex-1/4 border-2 m-2 px-2 mx-2'>
      <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Authors </h1>
      <div className="flex flex-col bg-gray-100 gap-3 ">
      {users && users.map((author, index) => (
            <div 
              className='flex justify-between items-center gap-2 border-2 border-gray-500 p-1 rounded-xl min-w-64 max-w-96 cursor-pointer'
             key={index} >
              <div onClick={() => navigate(`/authors/author/${author?._id}`)}>
              <AuthorCard author={author}  />
              </div>

              {author?._id !== currentUser?._id ? 
                (<Button 
                  onClick={()=>handleToggleFollowButtonClick(author)}
                  outline className='bg-gray-800 '> 
                                              {author?.followers?.includes(currentUser?._id) ? 
                                              ( <div className='flex gap-1 items-center relative'> <HiUser className='text-lg'/> <HiCheckCircle className='relative bottom-1 right-2 text-xs' />  Following</div> ) : 
                                              (<div className='flex items-center justify-center'> <HiUser className='text-lg mr-1' /> <HiPlusCircle className='text-xs relative right-2 bottom-1'/> <span className=''> Follow </span> </div>)}  
                </Button>) : 
                
                (<Button disabled> Owner </Button>)}
                
              {/* <Button
                onClick={()=>handleToggleFollowButtonClick(author)} 
                outline className='bg-gray-800 '> 
                <span className='flex justify-center items-center'> <HiUserAdd /> </span>
                <span className='hidden md:inline'> Follow </span>
              </Button> */}
             
            </div>
        ))}
      </div>        
    </div>   
  </div>
  )
}

export default Home