import React, { useEffect, useReducer, useRef, useState } from 'react';

import { Alert, Button } from 'flowbite-react';
import { HiBadgeCheck, HiCheckCircle, HiEye, HiOutlineUserCircle, HiOutlineUsers, HiPencil, HiPlus, HiPlusCircle, HiSelector, HiUser, HiUserAdd, HiUserCircle, HiUserRemove, HiX, HiXCircle } from 'react-icons/hi';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useDispatch, useSelector } from 'react-redux';
import { updateSuccess } from '../redux/slices/user.slice';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import LoaderPopup from './Loader';
import PageLoader from './PageLoader';
import FollowingsPopup from './FollowingPopup';
import FollowersPopup from './FollowersPopup';
import { formatDistanceToNow } from 'date-fns';
import StoryViewer from './StoryViewer';
import HighlightSelector from './HighlightSelector';
import HighlightNamePopup from './HighlightNamePopup';
import apiError from '../../../backend/src/Utils/apiError';
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
  const storyRef = useRef();
  const { currentUser } = useSelector(state=>state.user)
  const [dpLoading, setdpLoading] = useState(false);
  const [storyLoading, setStoryLoading]  = useState(false);
  const [isFollowingHovered, setisFollowingHovered] = useState(false);
  const [isFollowerHovered, setisFollowerHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false) //dp drop down to let user decide see dp add story or change dp
  const [stories, setStories] = useState([]); //fetched story data to display on click
  const [showStory, setShowStory] = useState(false); //condition check to show story or not
  const [showHighlightSelector, setShowHighlightSelector] = useState(false); //popup to display highlight story select
  const [showHighlightName, setShowHighlightName] = useState(false); //whether to display popup to take highlght name or not
  const [highlightName, setHighlightName] = useState('') //when user create new highlight ask them to enter name
  const [highlights, setHighlights] = useState([]); //initial data to display in screen's highlight row
  const [highlightClick, setHighlightClick] = useState(false)
  const [highlightClickStories, setHighlightClickStories] = useState([])
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
    setdpLoading(true)
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
      setdpLoading(false)
    }
  }

  const handleAddStory = async (e)=>{
    setShowDropdown(false);
    const files = e.target.files; 
    const formData = new FormData(); 
    setStoryLoading(true)
    for (let i = 0; i < files.length; i++) {
      formData.append('storyFiles', files[i]); 
    }

    try {
      const response = await fetch(apiEndPoints.addStoriesAddress(currentUser?._id), {
          method: "POST",
          body: formData,
        });

      console.log(response)
      const data = await response.json();
      if(!response.ok){
        throw new Error(data?.message || "Network response isn't ok while adding stories!")
      }
      if(data?.success){
        setStories((prevstories) => [...prevstories, data?.data?.stories[0]]);
        console.log("story uploaded", data)
        dispatch(updateSuccess(data?.data?.currentUser))
      }

    } catch (error) {
      console.log("inside add story", error)
      setError(error.message)
    }
    finally{
      setStoryLoading(false)
    }
  }

  useEffect(()=>{
    const getStories = async ()=>{
      try {
        console.log("inside useeffect", apiEndPoints.getStoriesOfUser(author?._id))
        const response = await fetch(apiEndPoints.getStoriesOfUser(author?._id));
        const data = await response.json();
        if(!response.ok){
          throw new Error(data?.message || "Network response isn't ok while fetching stories") 
        }

        if(data.success){
          setStories(data?.data?.stories);
          setHighlights(data?.data?.currentUser?.highlights);
          console.log("stories data fetched", data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getStories();
  }, [])


  const getHighlightName = (name)=>{
    setHighlightName(name);
  }

  
  const handleHighlightClick = async (highlight)=>{
    try {
      setLoading(true)
      console.log(highlight)
      const formData = new FormData();
      formData.append("stories", highlight.stories);
      const response = await fetch(apiEndPoints.getHighlightStories(), {method: "POST", body: formData});
      const data = await response.json();

      if(!response.ok){
        throw new Error(data?.message || "Network response isn't ok while fetching highligh stories")
      }

      if(data?.success){
        console.log(data);
        setHighlightClickStories(data?.data);
        setHighlightClick(true)
      }
    } catch (error) {
      alert(error.message)
      console.log(error)
    }
    finally{
      setLoading(false)
    }

  }
  return (
    <div className="flex flex-col items-center p-2 w-full">
    {dpLoading && <LoaderPopup loading={dpLoading} setLoading={setdpLoading} info={"Changing your dp!"} />}
    {storyLoading && <LoaderPopup loading={storyLoading} setLoading={setStoryLoading} info={"Updating your story!"} /> }
    {showStory && <StoryViewer stories={stories} onClose={setShowStory} heading={"Recent Stories..."}/>}
    {showHighlightSelector && <HighlightSelector setHighlights={setHighlights} highlightName={highlightName} stories={stories} isOpen={showHighlightSelector} onClose={setShowHighlightSelector}/>}
    {showHighlightName && <HighlightNamePopup isOpen={showHighlightName} onClose={setShowHighlightName} onSave={getHighlightName} selectHighlights={setShowHighlightSelector}/>}
    {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"fetching highlights"} />}
    {highlightClick && <StoryViewer stories={highlightClickStories} onClose={setHighlightClick} heading={"Highlight Stories"}/>}
{/* show dp popup starts here */}

      {showDP && (
        <div className="fixed w-full inset-0 flex justify-center items-center top-20  bg-opacity-50 z-20">
          <div className="p-2 rounded-lg shadow-lg flex flex-col">
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
          <div className='relative '>
            <input ref={profileRef} type='file' className='hidden' onChange={handleDPChange}/>
            { author?._id === currentUser?._id && !showDropdown &&
            <div onClick={()=>setShowDropdown(!showDropdown)}
              className='w-10 h-10 bg-white absolute border rounded-full top-20 left-24 flex justify-center items-center cursor-pointer'>
              <HiPencil className='text-2xl text-gray-950 relative' 
            />
            </div>}
            {showDropdown && <div className='bg-gray-300 text-black dark:bg-gray-700 dark:text-white rounded-lg font-semibold items-center relative top-32 left-20 z-10'>
              <div className='flex justify-between'> 
                <span></span> <HiX onClick={()=>setShowDropdown(false)} className='mr-2 mt-1' />
              </div>
              <span onClick={()=>{profileRef.current.click(), setShowDropdown(false)}} className='flex justify-center items-center gap-1 hover:text-lg cursor-pointer'><HiOutlineUserCircle /> Change DP</span>
              
              <input ref={storyRef} type='file' className='hidden' onChange={handleAddStory} multiple="multiple"/>
              <span onClick={()=>{storyRef.current.click()}} className='flex justify-center items-center gap-1 hover:text-lg cursor-pointer'> <HiPlus /> Add Story</span>
              <span onClick={()=>{setShowDP(!showDP)}} className='flex justify-center items-center hover:text-lg cursor-pointer gap-2'> <HiEye className='' /> Show DP</span>
            </div>}
            <div className={`w-36 h-36 ${stories?.length === 0 ? "bg-white dark:dark:bg-[rgb(16,23,42)]" : "bg-green-500"} rounded-full flex justify-center items-center`}>
              <img 
                onClick={()=>setShowStory(!showStory)}
                src={author.profilePic || "https://cdn4.sharechat.com/img_964705_8720d06_1675620962136_sc.jpg?tenant=sc&referrer=tag-service&f=136_sc.jpg"} 
                alt="Author" 
                className="w-32 h-32 rounded-full  object-cover cursor-pointer"
              />

            </div>
          </div>
          
          <div>
            <div className='flex md:flex-row justify-center items-center gap-4 border-b md:border-0 w-full'>
    
                <div className="flex flex-col justify-between w-full ">
                  <div className='flex justify-between'>
                    <div>
                        <h2 className="text-xl font-bold flex  ml-5 md:ml-10 justify-start">{author.fullName}</h2>
                        <p className="flex  ml-5 md:ml-10 justify-start">@{author.username}</p>
                    </div>
                    <div onClick={handleToggleFollowButtonClick} className='flex md:hidden justify-between w-10 text-2xl'> 
                        {author?._id !== currentUser?._id ? (author?.followers?.includes(currentUser?._id) ? 
                        (<HiUserRemove />)  : 
                        (<div className=''><span className='flex items-center justify-center gap-1'> <HiUserAdd /> </span></div>)): <div> <HiBadgeCheck /> </div>}

                    </div>
                          {/***********************************  popups ****************************************************/}
                    {/* <div className='flex justify-center items-center relative right-72 top-20'> */}
                    
                    <div className=''>
                      {isFollowingHovered && <FollowingsPopup author={author} isHovered={isFollowingHovered} setIsHovered={setisFollowingHovered} />}
                      {isFollowerHovered && <FollowersPopup 
                                          follower={author} 
                                          isHovered={isFollowerHovered} 
                                          setIsHovered={setisFollowerHovered} 
                                          handleToggleFollowButtonClick={handleToggleFollowButtonClick}

                                          />}
                    </div>

                    {/* </div> */}
                    <div className='hidden md:flex gap-4 md:ml-8'>
                        <div className="text-center cursor-pointer"
                          onClick={()=>setisFollowerHovered(!isFollowerHovered)}
                          >
                          <p className="text-lg font-semibold">{followersCount}</p>
                          <p className="">Followers</p>
                        </div>
                        <div
                          onClick={()=>setisFollowingHovered(!isFollowingHovered)}
                          // onMouseLeave={()=>setisFollowingHovered(!isFollowingHovered)} 
                          className="text-center cursor-pointer">
                          <p className="text-lg font-semibold">{author.followings.length}</p>
                          <p className="">Following</p>
                        </div>
                        <div className="text-center ">
                          <p className="text-lg font-semibold">{author.posts.length}</p>
                          <p className="">Posts</p>
                        </div>
                    </div>
                  </div>
                  
                  <div className='flex items-center justify-between my-2 mt-5 md:ml-10' >
                    {author?._id === currentUser?._id && <Button onClick={(()=>navigate("/edit-profile"))}> Edit Profile </Button>}
                    {author?._id !== currentUser?._id ? 
                (<Button 
                  onClick={()=>handleToggleFollowButtonClick(author)}
                  outline className=''> 
                                              {/* {author?.followers?.includes(currentUser?._id) ?  */}
                                              {currentUser?.followings?.includes(author?._id)?
                                              ( <div className='flex gap-1 items-center relative'> <HiUser className='text-lg'/> <HiCheckCircle className='relative bottom-1 right-2 text-xs' />  Following</div> ) : 
                                              (<div className='flex items-center justify-center'> <HiUser className='text-lg mr-1' /> <HiPlusCircle className='text-xs relative right-2 bottom-1'/> <span className=''> Follow </span> </div>)}  
                </Button>) : 
                
                  (<Button disabled className=''> <HiBadgeCheck className='text-xl w-20 h-5' /> </Button>)}   
                  </div>        
                </div>
            </div>
                                                  
            <div className="flex justify-between gap-2 md:hidden mt-4 md:mt-2 p-1 w-full px-5">
              <div
                onClick={()=>setisFollowerHovered(!isFollowerHovered)} 
                className="text-center cursor-pointer">
                <p className="text-lg font-semibold">{author.followers.length}</p>
                <p className="">Followers</p>
              </div>
              <div
                onClick={()=>setisFollowingHovered(!isFollowingHovered)}  
                className="text-center">
                <p className="text-lg font-semibold">{author.followings.length}</p>
                <p className="">Following</p>
              </div>
              <div className="text-center ">
                <p className="text-lg font-semibold">{author.posts.length}</p>
                <p className="">Posts</p>
              </div>          
            </div>
                                                  
          </div>       
      </div>

        <div className='flex justify-center items-center'>
            {author.bio && <p className="m-2 border p-2 rounded-lg flex justify-start">{author.bio||"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ipsam vel beatae voluptate corporis unde ducimus, distinctio sint quisquam debitis, repellat at saepe, quo adipisci officia recusandae delectus nemo nobis doloribus eius quas quod consequuntur. Aliquid amet rem quas dolore laborum praesentium molestias iste, harum quidem quod assumenda fugit ullam? "}</p>}
        </div>
        <Alert disabled color={`${author?.isActive ? 'success' : 'warning'}`} className='w-full justify-center items-center'><span className='text-xl font-bold'>{author?.isActive ? "Active" : `Last Seen: ${formatDistanceToNow(new Date(author?.lastActive), {addSuffix:true})}`}</span></Alert>
      <div className='w-full flex items-center overflow-x-scroll gap-3 pb-2 pl-2 h-40'>
  {/* Highlight creation button */}

        {/* Map through highlights */}
          {highlights.length > 0 &&
            highlights.map((highlight, index) => (
              <div onClick={()=>handleHighlightClick(highlight)}
                key={index} // Add a unique key for each item
                className='min-h-20 min-w-20 md:h-28  md:w-28 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:hover:bg-gray-500 dark:bg-gray-700 rounded-full mt-2 grid place-items-center cursor-pointer'
              >
                <div className='flex flex-col justify-center items-center text-nowrap dark:text-white'>
                  <div className='w-full flex items-center justify-center p'>                   
                    <img src={highlight?.thumbnail} className='h-16 w-16 md:h-24 md:w-24 rounded-full ' />
                  </div>
                </div>
                {/* <div className='text-nowrap'>highlight.name</div> */}
              </div>
            ))}
          {author?._id === currentUser?._id && <div
            onClick={() => setShowHighlightName(true)}
            className=' min-h-20 min-w-20 md:h-28  md:w-28 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:hover:bg-gray-500 dark:bg-gray-700 rounded-full mt-2 grid place-items-center cursor-pointer'
          >
            <div className='flex flex-col justify-center items-center text-nowrap dark:text-white'>
              <HiPlus className='text-5xl' />
              <span className='hidden md:inline'>Highlights</span>
            </div>
          </div>}
        </div>

    </div>
  );
};

export default AuthorHeader;
