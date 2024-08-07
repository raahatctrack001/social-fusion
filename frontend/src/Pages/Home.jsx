import React, { useState } from 'react'
import PostCard from '../Compnents/PostCard'
import AuthorCard from '../Compnents/AuthorCard'
import authorData from '../dataSeeders/authorData'
import { shuffle } from 'lodash'
import posts from '../dataSeeders/postData'

const Home = () => {
  const shuffledAuthors = shuffle(authorData);
  const authorsData = shuffledAuthors.slice(0, 8);

  
  const shuffledPosts = shuffle(posts);
  const postsData = shuffledPosts.slice(0, 8);
  return (
  <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white'>
    <div className='flex-1 flex flex-col border-2 border-gray-600 m-2 px-2'>
        <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Recent Posts </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 bg-gray-100 gap-2">
        {postsData && postsData.map((post, index) => (
              <div className='' key={index}>
                <PostCard post={post} />
              </div>
          ))}
      </div>
    </div>




    <div className='hidden flex-1 md:flex md:flex-col border-2 border-gray-600 m-2 px-2'>
      <h1 className='flex justify-center items-center font-bold text-2xl tracking-widest py-2 mt-5'> Our Authors </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-gray-100">
      {authorsData && authorsData.map((author, index) => (
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