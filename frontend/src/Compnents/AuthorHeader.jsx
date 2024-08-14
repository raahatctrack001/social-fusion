import React, { useReducer, useRef, useState } from 'react';
import { Button } from 'flowbite-react';
import { HiOutlineUsers, HiPencil, HiPlus, HiSelector, HiUserAdd, HiUserCircle, HiUserRemove } from 'react-icons/hi';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useDispatch, useSelector } from 'react-redux';
import { updateSuccess } from '../redux/slices/user.slice';
// import { signInSuccess } from '../redux/slices/user.slice';
// import { current } from '@reduxjs/toolkit';

const AuthorHeader = ({ author }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState()
  const profileRef = useRef();
  // const followRef = useRef(null)
  const { currentUser } = useSelector(state=>state.user)
  // const dispatch = useDispatch();
  const handleToggleFollowButtonClick = async ()=>{
    try {
      fetch(apiEndPoints.toggleFollowUserAddress(author._id), {
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
          alert(data.message)
          // if(data.success){
          //   currentUser?.followers = data.followers;
          //   currentUser?.followings = data.followings;
          // }
          console.log(data)
      })
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }
  
  const handleDPChange = async (e)=>{
    try {
        const formData = new FormData();
        formData.append("profilePicture", e.target.files[0]);
        const response = await fetch(apiEndPoints.updateDPAddress(currentUser?._id), {
          method: "PATCH",
          body: formData
        })

        if(!response.ok){
          setError(response.message);
        }

        const data = await response.json();
        alert(data.message);
        console.log(data);
        dispatch(updateSuccess(data.data))

        
      
    } catch (error) {
        setError(error.message)
    }
  }
  return (
    <div className="flex flex-col items-center p-2 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl border rounded-lg mb-5">
        <div className='flex md:flex-row justify-center items-center border-b md:border-0 p-2 w-full'>
          <div className='relative'>
            <input ref={profileRef} type='file' className='hidden' onChange={handleDPChange}/>
            <div onClick={()=>profileRef.current.click()} className='w-8 h-8 absolute border rounded-full bg-white top-3/4 left-16 flex justify-center items-center cursor-pointer'>
              <HiPencil className='text-2xl' />
            </div>
            <img 
              src={author.profilePic || "https://cdn4.sharechat.com/img_964705_8720d06_1675620962136_sc.jpg?tenant=sc&referrer=tag-service&f=136_sc.jpg"} 
              alt="Author" 
              className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6 object-cover"
            />
          </div>
            <div className="flex flex-col justify-between w-full">
              <div className='flex justify-between'>
                <div>
                    <h2 className="text-xl font-bold flex  ml-5 md:ml-10 justify-start">{author.fullName}</h2>
                    <p className="text-gray-600 flex  ml-5 md:ml-10 justify-start">@{author.username}</p>
                </div>
                <div onClick={handleToggleFollowButtonClick} className='flex md:hidden justify-center w-10 text-2xl'> 
                    {author?.followers?.includes(currentUser?._id) ? 
                    (<HiUserRemove />) : 
                    (<div className=''><span className='flex items-center justify-center gap-1'> <HiUserAdd /> </span></div>)}
                </div>
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
                {author?._id !== currentUser?._id ? 
                (<Button 
                  onClick={handleToggleFollowButtonClick}
                  className='hidden md:inline'> 
                                              {author?.followers?.includes(currentUser?._id) ? 
                                              ( <div className='flex gap-1 items-center'> <HiUserRemove /> Following</div> ) : 
                                              (<div className=''><span className='flex items-center justify-center gap-1'> <HiUserAdd /> follow </span></div>)}  
                </Button>) : 
                
                (<Button disabled> Owner </Button>)}
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
