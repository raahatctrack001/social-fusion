import React, { useState } from 'react'
import PostCard from '../Compnents/PostCard'
import AuthorCard from '../Compnents/AuthorCard'
import authorData from '../dataSeeders/authorData'
import { shuffle } from 'lodash'
import posts from '../dataSeeders/postData'
import { users } from '../dataSeeders/author50'
// import { posts } from '../dataSeeders/post50'
import { testPosts } from '../dataSeeders/post50'

const Home = () => {
  console.log(testPosts)
  const shuffledAuthors = shuffle(authorData);
  const authorsData = shuffledAuthors.slice(0, 8);

  
  const shuffledPosts = shuffle(posts);
  let postsData = shuffledPosts.slice(0, 8);
  return (
  <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
    <div className='flex-3/4 flex flex-col border-2  m-2 px-2'>
        <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Recent Posts </h1>
        <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100 gap-2 ">
        {testPosts && testPosts.map((post, index) => (
              <div className='' key={index}>
                <PostCard post={post} />
              </div>
          ))}
      </div>
    </div>




    <div className='flex-1/4 border-2 m-2 px-2 mx-2'>
      <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Authors </h1>
      <div className="flex flex-col bg-gray-100 gap-3">
      {users && users.map((author, index) => (
            <div className="" key={index}>
              <AuthorCard author={author} />
            </div>
        ))}
      </div>        
    </div>   
  </div>
  )
}

export default Home