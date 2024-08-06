import React from 'react'
import PostCard from '../Compnents/PostCard'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-800 flex'>
        <div className='w-3/4 flex justify-center items-center px-1 bg-red-700'>
              <div className='grid grid-col-3 gap-2'>
                <div className='h-56'>  
                  <PostCard />
                </div>
                <div className='h-56'>  
                  <PostCard />
                </div>
                <div className='h-56'>  
                  <PostCard />
                </div>
            </div>
        </div>
        <div className='flex flex-col w-1/4'>
          <div className='flex-1 bg-yellow-300 w-full flex justify-center items-center '>top right</div>
          <div className='flex-1 bg-green-800 w-full  flex justify-center items-center'>bottom right</div>
        </div>
    </div>
  )
}

export default Home