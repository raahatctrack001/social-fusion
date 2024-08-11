import React, { useEffect, useState } from 'react'
import PostCard from '../Compnents/PostCard'
import AuthorCard from '../Compnents/AuthorCard'
import authorData from '../dataSeeders/authorData'
import { shuffle } from 'lodash'
import { testPosts } from '../dataSeeders/post50'
import { apiEndPoints } from '../apiEndPoints/api.addresses'

const Home = () => {
  const [postData, setPostData] = useState([]);
  const [users, setUsers] = useState([]); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  
  useEffect(()=>{
    localStorage.removeItem("postData")
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
    localStorage.removeItem("authorData")
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
    if (selectedPost && selectedPost._id === post._id) {
      setSelectedPost(null); 
    } else {
      setSelectedPost(post);
    }
  };

  const handleAuthorSelect = (author) => {
    if (selectedAuthor && selectedAuthor._id) {
      setSelectedAuthor(null); 
    } else {
      setSelectedAuthor(author);
    }
  };
  console.log(selectedPost);
  console.log(selectedAuthor);
  return (
  <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
    <div className='flex-3/4 flex flex-col border-2  m-2 px-2'>
        <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Recent Posts </h1>
        <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100 gap-5 ">
        {postData && postData.map((post, index) => (
              <div className='' key={index} onClick={() => handlePostSelect(post)}>
                <PostCard post={post} />
              </div>
          ))}
      </div>
    </div>




    <div className='flex-1/4 border-2 m-2 px-2 mx-2'>
      <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Authors </h1>
      <div className="flex flex-col bg-gray-100 gap-3">
      {users && users.map((author, index) => (
            <div className="" key={index} onClick={() => handleAuthorSelect(author)}>
              <AuthorCard author={author}  />
            </div>
        ))}
      </div>        
    </div>   
  </div>
  )
}

export default Home