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
import { useDispatch, useSelector } from 'react-redux'
import ShowPosts from '../Compnents/ShowPosts'
import { updateSuccess } from '../redux/slices/user.slice'
import PageLoader from '../Compnents/PageLoader'

const Home = () => {
  const { currentUser } = useSelector(state=>state.user)
  const [postData, setPostData] = useState();
  const [users, setUsers] = useState(); 
  
  const dispatch = useDispatch();

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
    const fetchUser = async ()=>{ 
      await fetch(apiEndPoints.getUsersAddress())
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
          // dispatch(updateSuccess(  ))
        })
        .catch((error)=>{
          throw new Error("error getting author's detail! ", error)
        })
    }
    fetchUser();
    const interval = setInterval(() => {    
            fetchUser()
          }, 100000);
    return ()=>clearInterval(interval)
  }, [])

  const handleToggleFollowButtonClick = async (author)=>{
    try {
      await fetch(apiEndPoints.toggleFollowUserAddress(author._id), {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((response)=>{
        if(!response.ok){
          throw new Error(response.message || "Network response isn't ok!")
        }
        // console.log("resonse: ", response);
        return response.json();
      })
      .then((data)=>{
          console.log("toggle follow data", data);
          if(data.success){
            dispatch(updateSuccess(data?.data?.follower))
          }
          
      })
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }
  if(!postData){
    return <PageLoader />
  }
  return (
  <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
    {postData ? <ShowPosts heading={"Our recent posts!"} postData={postData} /> : <NotFoundPage /> }

    <div className='flex-1/4 m-2 px-2 mx-2'>
      <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Authors </h1>
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 gap-3  ">
      {users && users.map((author, index) => (
            <div 
              className='flex justify-between items-center gap-2 border-2 shadow-2xl hover:shadow-white hover:shadow-sm-light border-gray-500 p-1 rounded-xl min-w-64 max-w-96 cursor-pointer'
             key={index} >
              <div onClick={() => navigate(`/authors/author/${author?._id}`)}>
              <AuthorCard author={author}  />
              </div>

              {author?._id !== currentUser?._id ? 
                (<Button 
                  onClick={()=>handleToggleFollowButtonClick(author)}
                  outline className='bg-gray-800 '> 
                                              {/* {author?.followers?.includes(currentUser?._id) ?  */}
                                              {currentUser?.followings?.includes(author?._id)?
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