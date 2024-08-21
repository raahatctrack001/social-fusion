import React, { useReducer, useRef, useState } from 'react';

import { Button } from 'flowbite-react';
import { HiBadgeCheck, HiCheckCircle, HiOutlineUsers, HiPencil, HiPlus, HiPlusCircle, HiSelector, HiUser, HiUserAdd, HiUserCircle, HiUserRemove, HiX, HiXCircle } from 'react-icons/hi';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useDispatch, useSelector } from 'react-redux';
import { updateSuccess } from '../redux/slices/user.slice';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import LoaderPopup from './Loader';
// import { info } from 'console';
// import { update } from 'lodash';
// import { signInSuccess } from '../redux/slices/user.slice';
// import { current } from '@reduxjs/toolkit';

const AuthorHeader = ({ author, setAuthor }) => {
  const [followersCount, setFollowersCount] = useState(author?.followers?.length)
  // const [followingCount, setFollowingCount] = useState(author?.followings?.length)
  // console.log(author)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState()
  const [showDP, setShowDP] = useState(false);
  const profileRef = useRef();
  const { currentUser } = useSelector(state=>state.user)
  const [loading, setLoading] = useState(false);

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
          console.log(data.message)          
          if(currentUser?.followings?.includes(author?._id)){
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
  
  const handleDPChange = async (e)=>{
    setLoading(true)
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
        if(data.success){
          setAuthor(data?.data)
          // alert(data.message);
          console.log("dp change data", data);
          dispatch(updateSuccess(data.data))
        }
            
    } catch (error) {
        setError(error.message)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col items-center p-2 w-full">
    {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"Changing your dp!"} />}
{/* show dp popup starts here */}
      {showDP && (
        <div className="fixed w-full inset-0 flex justify-center items-center top-20 bg-black bg-opacity-50 z-20">
          <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between relative">
              <div> </div>
              <div onClick={()=>setShowDP(!showDP)} className="relative bottom-1 right-1 cursor-pointer"> <HiXCircle className="text-red-700 text-lg"/> </div>
            </div>
            <div className='max-w-lg'>
              <img className='rounded-lg' src={author?.profilePic} alt="" />
            </div>
          </div>
        </div>
      )}

      {/* show dp popup ends here */}
      <div className="flex flex-col md:flex-row items-center p-2 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl border rounded-lg mb-5">
          <div className='relative'>
            <input ref={profileRef} type='file' className='hidden' onChange={handleDPChange}/>
            { author?._id === currentUser?._id && <div onClick={()=>profileRef.current.click()} 
              className='w-10 h-10 absolute border rounded-full bg-white top-20 left-24 flex justify-center items-center cursor-pointer'>
              <HiPencil className='text-2xl' />
            </div>}
            <img 
              onClick={()=>setShowDP(!showDP)}
              src={author.profilePic || "https://cdn4.sharechat.com/img_964705_8720d06_1675620962136_sc.jpg?tenant=sc&referrer=tag-service&f=136_sc.jpg"} 
              alt="Author" 
              className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6 object-cover"
            />
          </div>
          
          <div>
            <div className='flex md:flex-row justify-center items-center gap-4 border-b md:border-0 w-full'>
    
                <div className="flex flex-col justify-between w-full ">
                  <div className='flex justify-between'>
                    <div>
                        <h2 className="text-xl font-bold flex  ml-5 md:ml-10 justify-start">{author.fullName}</h2>
                        <p className="text-gray-600 flex  ml-5 md:ml-10 justify-start">@{author.username}</p>
                    </div>
                    <div onClick={handleToggleFollowButtonClick} className='flex md:hidden justify-between w-10 text-2xl'> 
                        {author?._id !== currentUser?._id ? (author?.followers?.includes(currentUser?._id) ? 
                        (<HiUserRemove />)  : 
                        (<div className=''><span className='flex items-center justify-center gap-1'> <HiUserAdd /> </span></div>)): <div> <HiBadgeCheck /> </div>}
                    </div>
                    <div className='hidden md:flex gap-4 md:ml-8'>
                        <div className="text-center">
                          <p className="text-lg font-semibold">{followersCount}</p>
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
                  <div className='flex items-center justify-between my-2 mt-5 md:ml-10' >
                    {author?._id === currentUser?._id && <Button onClick={(()=>navigate("/edit-profile"))}> Edit Profile </Button>}
                    {author?._id !== currentUser?._id ? 
                (<Button 
                  onClick={()=>handleToggleFollowButtonClick(author)}
                  outline className='bg-gray-800 '> 
                                              {/* {author?.followers?.includes(currentUser?._id) ?  */}
                                              {currentUser?.followings?.includes(author?._id)?
                                              ( <div className='flex gap-1 items-center relative'> <HiUser className='text-lg'/> <HiCheckCircle className='relative bottom-1 right-2 text-xs' />  Following</div> ) : 
                                              (<div className='flex items-center justify-center'> <HiUser className='text-lg mr-1' /> <HiPlusCircle className='text-xs relative right-2 bottom-1'/> <span className=''> Follow </span> </div>)}  
                </Button>) : 
                
                  (<Button disabled className='bg-gray-900'> <HiBadgeCheck className='text-xl text-white w-20 h-5' /> </Button>)}   
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
      </div>
        <div className='flex justify-center items-center'>
            {author.bio && <p className="m-2 border p-2 rounded-lg text-gray-700 flex justify-start">{author.bio||"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ipsam vel beatae voluptate corporis unde ducimus, distinctio sint quisquam debitis, repellat at saepe, quo adipisci officia recusandae delectus nemo nobis doloribus eius quas quod consequuntur. Aliquid amet rem quas dolore laborum praesentium molestias iste, harum quidem quod assumenda fugit ullam? "}</p>}
        </div>
    </div>
  );
};

export default AuthorHeader;
