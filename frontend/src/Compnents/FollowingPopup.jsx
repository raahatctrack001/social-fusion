import React, { useEffect, useState } from 'react';
import { HiUserAdd } from 'react-icons/hi';
import PageLoader from './PageLoader';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import apiError from '../../../backend/src/Utils/apiError';
import { useNavigate } from 'react-router-dom';

const FollowingsPopup = ({ author, isHovered, setIsHovered }) => {
  const [followings, setFollowings] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const getFollowings = async()=>{
        const response = await fetch(apiEndPoints.getFollowingsAddress(author?._id));
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || "internal server error");
        }
        // alert(data)
        if(data.success){
            console.log(data)
            // alert(data.message);
            setFollowings(data?.data)
        }
    }
    getFollowings();
  }, [])
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFollow = (username) => {
    alert(`Follow ${username}`);
    // Handle the follow action here, e.g., API call to follow the user
  };

  if(!followings){
    <PageLoader />
  }
  const handleFollowingClick = (followingId)=>{
    setIsHovered(false);
    navigate(`/authors/author/${followingId}`)
  }
  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <div className="cursor-pointer">
        Followings: {followings.length}
      </div> */}

      {isHovered && (
        <div className="absolute top-full left-0 mt-2 w-80 h-96 p-4 bg-white border  rounded-lg shadow-lg z-10 dark:bg-gray-800 dark:border-gray-600">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Followings </h3>
          <ul className="max-h-80 overflow-y-auto space-y-2">
            {followings?.length && followings.map((following, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-700"
              >
                <div className="flex items-center cursor-pointer" onClick={()=>handleFollowingClick(following?._id)}>
                  <img
                    src={following.profilePic}
                    alt={following.username}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <span className="text-gray-800 dark:text-gray-200">{following.username}</span>
                </div>
                {/* <button
                  onClick={() => handleFollow(following.username)}
                  className="flex items-center justify-center px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  <HiUserAdd className="mr-1" />
                  Follow
                </button> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FollowingsPopup;
