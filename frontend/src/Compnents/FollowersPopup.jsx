import React, { useEffect, useState } from 'react';
import { HiCheckCircle, HiPlusCircle, HiUser, HiUserAdd } from 'react-icons/hi';
import PageLoader from './PageLoader';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import apiError from '../../../backend/src/Utils/apiError';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';

const FollowersPopup = ({ follower, isHovered, setIsHovered }) => {
  const [followers, setfollowers] = useState(null);
 const { currentUser } = useSelector(state=>state.user)

  useEffect(()=>{
    const getfollowers = async()=>{
        const response = await fetch(apiEndPoints.getFollowersAddress(follower?._id));
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || "internal server error");
        }
        // alert(data)
        if(data.success){
            console.log(data)
            // alert(data.message);
            setfollowers(data?.data)
        }
    }
    getfollowers();
  }, [])
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleToggleFollowButtonClick = async (follower)=>{
    try {
      fetch(apiEndPoints.toggleFollowUserAddress(follower._id), {
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
          console.log(data.message)          
          if(currentUser?.followings?.includes(follower?._id)){
            setFollowersCount(followersCount-1)
          }
          else{
            setFollowersCount(followersCount+1)
          }
          dispatch(updateSuccess(data?.data?.follower))

      })
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }

  if(!followers){
    <PageLoader />
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <div className="cursor-pointer">
        followers: {followers.length}
      </div> */}

      {isHovered && (
        <div className=" absolute top-full left-0 mt-2 w-80 h-96 p-4 bg-white border  rounded-lg shadow-lg z-10 dark:bg-gray-800 dark:border-gray-600">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">followers: </h3>
          <ul className="max-h-80 overflow-y-auto space-y-2">
            {followers?.length && followers.map((follower, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-700"
              >
                <div className="flex items-center">
                  <img
                    src={follower.profilePic}
                    alt={follower.username}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <span className="text-gray-800 dark:text-gray-200">{follower.username}</span>
                </div>
                {/* <button
                  onClick={() => handleFollow(follower.username)}
                  className="flex items-center justify-center px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  <HiUserAdd className="mr-1" />
                  Follow
                </button> */}

                {follower?._id !== currentUser?._id ? 
                (<Button 
                  onClick={()=>handleToggleFollowButtonClick(follower)}
                  outline className='bg-gray-800 '> 
                                              {/* {follower?.followers?.includes(currentUser?._id) ?  */}
                                              {currentUser?.followings?.includes(follower?._id)?
                                              ( <div className='flex gap-1 items-center relative'> <HiUser className='text-lg'/> <HiCheckCircle className='relative bottom-1 right-2 text-xs' />  Following</div> ) : 
                                              (<div className='flex items-center justify-center'> <HiUser className='text-lg mr-1' /> <HiPlusCircle className='text-xs relative right-2 bottom-1'/> <span className=''> Follow </span> </div>)}  
                </Button>) : 
                
                (<Button disabled> Owner </Button>)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FollowersPopup;
