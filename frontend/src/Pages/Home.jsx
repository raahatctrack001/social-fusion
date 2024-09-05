import React, { useEffect, useState } from 'react'
import PostCard from '../Compnents/PostCard'
import AuthorCard from '../Compnents/AuthorCard'
import authorData from '../dataSeeders/authorData'
import { shuffle } from 'lodash'
import { testPosts } from '../dataSeeders/post50'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextInput } from 'flowbite-react'
import { HiBadgeCheck, HiCheckCircle, HiPlusCircle, HiSearch, HiUser, HiUserAdd, HiUserRemove } from 'react-icons/hi'
import NotFoundPage from './NotFoundPage'
import { useDispatch, useSelector } from 'react-redux'
import ShowPosts from '../Compnents/ShowPosts'
import { updateSuccess } from '../redux/slices/user.slice'
import PageLoader from '../Compnents/PageLoader'
import { current } from '@reduxjs/toolkit'
import { HiServerStack } from 'react-icons/hi2'

const Home = () => {
  const { currentUser } = useSelector(state=>state.user)
  const [postData, setPostData] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(()=>{
    (()=>{
      //fetch user count
    })()
  }, [])

  useEffect(()=>{
    (()=>{
      //fetch post count
    })()
  }, [])

  useEffect(()=>{
    fetch(apiEndPoints.getPostsAddress(currentPage))
      .then((posts)=>{
        if(!posts){
          throw new Error("network response wasn't ok!");
        }
        return posts.json()
      })
      .then((data)=>{
        const fetchedData = data.data?.posts;
        //console.log("fetched post"); 
        setPostData(fetchedData)
        const total = data?.data?.totalCount;
        setTotalPost(Math.floor(total/9+1))
        window.scrollTo(0, 0);
      })
      .catch((err)=>{
        throw new Error("Error fetching posts", err);
      })
  }, [currentPage])


  useEffect(()=>{
    const fetchUser = async ()=>{ 
      await fetch(apiEndPoints.getUsersAddress(currentUserPage))
        .then((users)=>{
          if(!users){
            throw new Error("error getting author's detail")
          }

          return users.json();
        })
        .then((data)=>{
          //console.log("fetched user")
          // console.log(data);
          setUsers(data.data?.safeUsers);
          const totalUser = data?.data?.totalUsers;
          setTotalUser(Math.floor(totalUser/10)+1);
          // window.scrollTo(0, 0);

          // dispatch(updateSuccess(  ))
        })
        .catch((error)=>{
          throw new Error("error getting author's detail! ", error)
        })
    }
    fetchUser();
    const interval = setInterval(() => {    
            fetchUser()
          }, 90000);
    return ()=>clearInterval(interval)
  }, [currentUserPage])

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
          //console.log("toggle follow data", data);
          if(data.success){
            dispatch(updateSuccess(data?.data?.follower))
          }
          
      })
    } catch (error) {
        alert(error.message);
        //console.log(error);
    }
  }
  useEffect(()=>{
    if(searchTerm.trim() !== ''){
      const timeout = setTimeout(() => {      
        (async ()=>{
          const response = await fetch(apiEndPoints.searchUsersAddress(searchTerm), {method: "POST"});
          const data = await response.json();

          if(!response.ok){
            throw new Error(data.message || "Network response wasn't ok while searching user...")
          }

          if(data.success){
            setSearchedUsers(data.data)
            setUserFound(true)
          }
        })()
      }, 1000);
      return ()=>clearTimeout(timeout)
    }
    else{
      setSearchedUsers([]);
      setUserFound(false)
    }
      
  }, [searchTerm])
  if(!postData){
    return <PageLoader />
  }
  // console.log(searchedUsers);
  // console.log("tatalpsots", totalPost)
  // console.log('totalUsers', totalUser)
  const mapperList = searchedUsers.length > 0 ? searchedUsers : users;
  return (
  <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
    
   <div className='flex flex-col'>
   <div className=' overflow-y-scroll' style={{ height: '780px' }} >
    {postData ? <ShowPosts heading={`Our recent posts ${currentPage}/${totalPost}`} postData={postData} /> : <NotFoundPage /> }

   </div>
      <div className='w-full flex items-center justify-center gap-4 mb-4'> 
          <Button disabled={currentPage <= 1} onClick={()=>setCurrentPage(currentPage=>currentPage-1)}> Prev </Button> 
            {currentPage-3 > 0 && 
              <div className='flex gap-2 cursor-pointer hover:bg-gray-500 rounded-lg px-1' onClick={()=>setCurrentPage(1)}> 
                <span > 1 </span>
                <span> . </span>
                <span> . </span>
                <span> . </span>              
              </div>              
              }
              <span onClick={()=>setCurrentPage(currentPage-2)} className='cursor-pointer hover:bg-gray-500 rounded-lg px-1'>{currentPage-2 > 0 && currentPage-2}</span> 
              <span onClick={()=>setCurrentPage(currentPage-1)} className='cursor-pointer hover:bg-gray-500 rounded-lg px-1'>{currentPage-1 > 0 && currentPage-1}</span> 
              <span className='border w-12 py-1 grid place-items-center rounded-lg bg-gray-700 text-white font-bold mb-1'>  {currentPage} </span> 
              <span className='cursor-pointer hover:bg-gray-500 rounded-lg px-1' onClick={()=>setCurrentPage(currentPage+1)}>{(currentPage+1 <= totalPost) && currentPage+1} </span>
              <span className='cursor-pointer hover:bg-gray-500 rounded-lg px-1' onClick={()=>setCurrentPage(currentPage+2)}>{(currentPage+2 <=  totalPost) && currentPage+2}</span>
              {currentPage+2 < totalPost && 
              <div className='flex gap-2 cursor-pointer hover:bg-gray-500 rounded-lg px-1' onClick={()=>setCurrentPage(totalPost)}>
                <span> . </span>
                <span> . </span>
                <span> . </span>
                <span> {totalPost} </span>
              </div>}
          <Button disabled={currentPage >= totalPost} onClick={()=>setCurrentPage(currentPage=>currentPage+1)}> Next </Button> 
      </div>
   </div>

    <div className="mt-1 p-2 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
  <h1 className="text-center font-bold text-3xl tracking-wide text-gray-800 dark:text-gray-200 mb-1">
    Users ({currentUserPage}/{totalUser})
    {searchTerm?.length > 0 && searchedUsers.length === 0 && (
  <p> {searchTerm.length > 0 && !userFound ? <p className='text-green-500'> searching... </p> : <p className='text-red-500'> user not found </p>} </p>
)}

  </h1>
  <TextInput  
      className='mb-2'
      icon={HiSearch} 
      placeholder='searc user...'
      onChange={(e)=>setSearchTerm(e.target.value)}
      />
  
  <div className="flex flex-col gap-4 overflow-y-scroll bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-inner" style={{ height: '650px' }}>
    {mapperList?.length > 0 ? mapperList.map((author, index) => (
      <div 
        onClick={()=>navigate(`/authors/author/${author?._id}`)}
        className="flex justify-between items-center gap-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg cursor-pointer"
        key={index}>
        
        {/* Author Info */}
        <AuthorCard author={author}/>

        {/* Follow/Unfollow Button */}
        {author?._id !== currentUser?._id ? 
          (<Button 
            onClick={() => handleToggleFollowButtonClick(author)}
            className={`px-4 py-2 rounded-lg ${currentUser?.followings?.includes(author?._id) ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} transition-colors duration-300`}>
            {currentUser?.followings?.includes(author?._id) ? 'Following' : 'Follow'}
          </Button>) :
          (<Button disabled className="px-4 py-2 bg-gray-500 text-white rounded-lg">You</Button>)
        }
      </div>
    )) : <div>No Users! Be the first to sign in.</div>}
  </div>

  {/* Pagination */}
  <div className="flex justify-center items-center gap-2 mt-4">
    <Button disabled={currentUserPage === 1} onClick={() => setCurrentUserPage(prev => prev - 1)} className="px-3 py-2 bg-gray-700 text-white rounded-md">Prev</Button>

    {/* Pagination numbers */}
    {currentUserPage - 3 > 0 && (
      <div className="flex items-center cursor-pointer" onClick={() => setCurrentUserPage(1)}>
        <span>1</span>
        <span className="mx-1">...</span>
      </div>
    )}

    <div className="flex gap-1">
      {currentUserPage - 2 > 0 && (
        <span className="cursor-pointer hover:bg-gray-300 rounded-md px-2" onClick={() => setCurrentUserPage(currentUserPage - 2)}>
          {currentUserPage - 2}
        </span>
      )}
      {currentUserPage - 1 > 0 && (
        <span className="cursor-pointer hover:bg-gray-300 rounded-md px-2" onClick={() => setCurrentUserPage(currentUserPage - 1)}>
          {currentUserPage - 1}
        </span>
      )}
    </div>

    <div className="font-bold text-white bg-blue-600 px-3 py-1 rounded-lg">
      {currentUserPage}
    </div>

    <div className="flex gap-1">
      {currentUserPage + 1 <= totalUser && (
        <span className="cursor-pointer hover:bg-gray-300 rounded-md px-2" onClick={() => setCurrentUserPage(currentUserPage + 1)}>
          {currentUserPage + 1}
        </span>
      )}
      {currentUserPage + 2 <= totalUser && (
        <span className="cursor-pointer hover:bg-gray-300 rounded-md px-2" onClick={() => setCurrentUserPage(currentUserPage + 2)}>
          {currentUserPage + 2}
        </span>
      )}
    </div>

    {currentUserPage + 3 <= totalUser && (
      <div className="flex items-center cursor-pointer" onClick={() => setCurrentUserPage(totalUser)}>
        <span className="mx-1">...</span>
        <span>{totalUser}</span>
      </div>
    )}

    <Button disabled={currentUserPage === totalUser} onClick={() => setCurrentUserPage(prev => prev + 1)} className="px-3 py-2 bg-gray-700 text-white rounded-md">Next</Button>
  </div>
</div>
  
  </div>
  )
}

export default Home