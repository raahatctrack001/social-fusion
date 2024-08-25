import React, { useEffect, useState } from 'react';
import { HiCheckCircle, HiPlusCircle, HiUser, HiUserAdd } from 'react-icons/hi';
import PageLoader from './PageLoader';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import apiError from '../../../backend/src/Utils/apiError';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { Navigate, useNavigate } from 'react-router-dom';

const LikersPopup = ({ postId, isHovered, setIsHovered }) => {
  const [likers, setLikers] = useState(null);
//  const { currentUser } = useSelector(state=>state.user)
  const navigate = useNavigate();

  useEffect(()=>{
    const getLikers = async()=>{
        const response = await fetch(apiEndPoints.getLikersOfPost(postId));
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || "internal server error");
        }
        // alert(data)
        if(data.success){
            console.log(data)
            // alert(data.message);
            setLikers(data?.data)
        }
    }
    getLikers();
  }, [])
  const handleMouseEnter = () => {
    setIsHovered({[postId]:true});
  };

  const handleMouseLeave = () => {
    setIsHovered({[postId]: false});
  };

//   if(!likers.length){
//     <PageLoader />
//   }

  const handleFollowerClick = (followerId)=>{
    setIsHovered(false)
    navigate(`/authors/author/${followerId}`)    
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
        <div className=" absolute top-full left-0 mt-2 w-80 h-96 p-4 bg-white border  rounded-lg shadow-lg z-10 dark:bg-gray-800 dark:border-gray-600">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Liked By: </h3>
          <ul className="max-h-80 overflow-y-auto space-y-2">
            {likers?.length && likers.map((liker, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-700"
              >
                <div className="flex items-center cursor-pointer" onClick={()=>handleFollowerClick(liker?._id)}>
                  <img
                    src={liker.profilePic}
                    alt={liker.username}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <span className="text-gray-800 dark:text-gray-200">{liker.username}</span>
                </div>
                {/* <button
                  onClick={() => handleFollow(follower.username)}
                  className="flex items-center justify-center px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  <HiUserAdd className="mr-1" />
                  Follow
                </button> */}

                
              </li>
            ))}
          </ul>
        </div>
      
    </div>
  );
};

export default LikersPopup;
