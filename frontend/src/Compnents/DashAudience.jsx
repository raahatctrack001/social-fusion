import React, { useEffect, useState } from 'react'
import NotFoundPage from '../Pages/NotFoundPage'
import UnderDevelopment from '../TestComponent/UnderDevelopment'
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useSelector } from 'react-redux';
import PopulateUsers from './PopulateUsers';

const DashAudience = () => {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [isFollowers, setIsFollowers] = useState(false);
  const [isFollowings, setIsFollowings] = useState(false);
  
  const { currentUser } = useSelector(state=>state.user);
  useEffect(()=>{
    (async ()=>{
      try {
        const response = await fetch(apiEndPoints.getFollowersAddress(currentUser?._id));
        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Network response wasn't ok while fetching followers");
        }
        if(data.success){
          setFollowers(data?.data);
          setIsFollowers(true)
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  useEffect(()=>{
    (async ()=>{
      try {
        const response = await fetch(apiEndPoints.getFollowingsAddress(currentUser?._id));
        const data = await response.json();
  
        if(!response.ok){
          throw new Error(data.message || "Network response was't ok while fetching follwings")
        }
  
        if(data.success){
          setFollowings(data.data);
        }
      } catch (error) {
         console.log(error);
      }
    })()
  }, [])
  
  
  return (
    <div className='dark:bg-gray-700 py-5'>
      <h1 className='w-full flex justify-center items-center border p-5 text-xl font-bold'> My Audience </h1>
      <div className='flex w-full justify-center gap-2'>
        <div onClick={()=>{setIsFollowers(true); setIsFollowings(false)}} className={`${isFollowers ? 'border-white dark:bg-gray-700 border dark:border-b-gray-700 z-10 relative top-1': ' dark:bg-gray-700'} py-2 px-5  rounded-lg mt-2 md:w-72 lg:w-96 grid place-items-center cursor-pointer`}> Followers {followers?.length} </div>
        <div onClick={()=>{setIsFollowers(false); setIsFollowings(true)}} className={`${isFollowings ? 'border-white dark:bg-gray-700 border dark:border-b-gray-700 z-10 relative top-1': ' dark:bg-gray-700'} py-2 px-5  rounded-lg mt-2 md:w-72 lg:w-96 grid place-items-center cursor-pointer`}> Followings {followings?.length} </div>
      </div>
      <div className='mx-14 py-2 border rounded-lg'>
        {isFollowers && <PopulateUsers users={followers} />}
        {isFollowings && <PopulateUsers users={followings} />}
      </div>
    </div>
  )
}

export default DashAudience