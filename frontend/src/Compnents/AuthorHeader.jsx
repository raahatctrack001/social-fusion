import React from 'react';
import { Button } from 'flowbite-react';
import { HiUserAdd } from 'react-icons/hi';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const AuthorHeader = ({ author }) => {
  const { currentUser } = useSelector(state=>state.user)
  const handleFollowButtonClick = async ()=>{
    try {
      fetch(apiEndPoints.followUserAddress(author._id), {
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
        if(!data.success){
          alert(data.message)
        }
        console.log(data)
      })
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }
  console.log(author?._id)
  console.log(currentUser?._id);
  return (
    <div className="flex flex-col items-center p-2 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl border rounded-lg mb-5">
        <div className='flex md:flex-row justify-center items-center border-b md:border-0 p-2 w-full'>
            <img 
              src={author.profilePic || "https://cdn4.sharechat.com/img_964705_8720d06_1675620962136_sc.jpg?tenant=sc&referrer=tag-service&f=136_sc.jpg"} 
              alt="Author" 
              className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6 object-cover"
            />
            <div className="flex flex-col justify-between w-full">
              <div className='flex justify-between'>
                <div>
                    <h2 className="text-xl font-bold flex  ml-5 md:ml-10 justify-start">{author.fullName}</h2>
                    <p className="text-gray-600 flex  ml-5 md:ml-10 justify-start">@{author.username}</p>
                </div>
                <span className='flex md:hidden justify-center w-10'> <HiUserAdd /> </span>
                <div className='hidden md:flex gap-4'>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{author.followers.length}</p>
                      <p className="text-gray-600">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{author.followings.length}</p>
                      <p className="text-gray-600">Following</p>
                    </div>
                    <div className="text-center ">
                      <p className="text-lg font-semibold">{author.posts.length}</p>
                      <p className="text-gray-600">Posts</p>
                    </div>
                </div>
              </div>
              <div className='flex justify-between mt-2'>
                {<p className="mt-2 text-gray-700 flex  ml-5 md:ml-10 justify-start">{author.bio||""}</p>}
                {author?._id !== currentUser?._id ? <Button 
                  onClick={handleFollowButtonClick}
                  className='hidden md:inline'> <span className='flex items-center justify-center mr-1'> <HiUserAdd /> </span>  Follow 
                </Button> : <Button disabled> Owner </Button>}
              </div>        
            </div>
        </div>

        <div className="flex justify-between gap-2 md:hidden mt-4 md:mt-2 p-1 w-full px-5">
          <div className="text-center">
            <p className="text-lg font-semibold">{author.followers.length}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{author.followings.length}</p>
            <p className="text-gray-600">Following</p>
          </div>
          <div className="text-center ">
            <p className="text-lg font-semibold">{author.posts.length}</p>
            <p className="text-gray-600">Posts</p>
          </div>          
        </div>
    </div>
  );
};

export default AuthorHeader;
