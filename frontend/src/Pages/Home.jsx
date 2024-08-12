import React, { useEffect, useState } from 'react'
import PostCard from '../Compnents/PostCard'
import AuthorCard from '../Compnents/AuthorCard'
import authorData from '../dataSeeders/authorData'
import { shuffle } from 'lodash'
import { testPosts } from '../dataSeeders/post50'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { HiUserAdd } from 'react-icons/hi'

const Home = () => {
  const [postData, setPostData] = useState([]);
  const [users, setUsers] = useState([]); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  // const [authorId, setAuthorId] = useState(null);


  const navigate = useNavigate();

  useEffect(()=>{
    // localStorage.removeItem("postData")
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
        localStorage.setItem("postData", data.data);
      })
      .catch((err)=>{
        throw new Error("Error fetching posts", err);
      })
  }, [])


  useEffect(()=>{
    // localStorage.removeItem("authorData")
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
        localStorage.setItem("authorData", data.data);
      })
      .catch((error)=>{
        throw new Error("error getting author's detail! ", error)
      })
  }, [])


  const handlePostSelect = (post) => {
    // localStorage.removeItem("postToDisplay")
    if (!(selectedPost && selectedPost._id === post._id)) {
      localStorage.setItem("postToDisplay", JSON.stringify(post));
      navigate(`/posts/post/${post._id}`)
      setSelectedPost(null); 
    }
  };

  const handleAuthorSelect = (author) => {
    // localStorage.removeItem("authorToDisplay")
    if (!(selectedAuthor && selectedAuthor._id)) {
      localStorage.setItem("authorToDisplay", JSON.stringify(author));
      navigate(`/authors/author/${author?._id}`)
    } 
  };
  console.log(users)
  console.log(postData)
  return (
  <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
    <div className='flex-3/4 flex flex-col border-2  m-2 px-2'>
        <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Recent Posts </h1>
        <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100 gap-5 ">
        {postData.length ? postData.map((post, index) => ( //handle the edge case if there's not post
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
                  <Button 
                      onClick={()=>console.log("follow button from post got a click")}
                      outline pill> <HiUserAdd /> </Button>
                </div>
                <div onClick={() => handlePostSelect(post)} className='cursor-pointer'>  
                  <PostCard post={post}  />
                </div>
              </div>
          )) : <h1> no posts yet </h1>}
      </div>
    </div>




    <div className='flex-1/4 border-2 m-2 px-2 mx-2'>
      <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Authors </h1>
      <div className="flex flex-col bg-gray-100 gap-3">
      {users && users.map((author, index) => (
            <div 
              className='flex justify-between items-center gap-2 border-2 border-gray-500 p-1 rounded-xl min-w-64 max-w-96 cursor-pointer'
             key={index} >
              <div onClick={() => handleAuthorSelect(author)}>
              <AuthorCard author={author}  />
              </div>
              <Button
                onClick={()=>console.log("follow button got a click")} 
                outline className='bg-gray-800 '> 
                <span className='flex justify-center items-center'> <HiUserAdd /> </span>
                <span className='hidden md:inline'> Follow </span>
              </Button>
             
            </div>
        ))}
      </div>        
    </div>   
  </div>
  )
}

export default Home