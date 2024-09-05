import React, { useState, useEffect, useCallback } from 'react';
import { HiX, HiPause, HiPlay, HiDotsHorizontal, HiDotsVertical, HiOutlineDotsVertical, HiSwitchVertical, HiDotsCircleHorizontal, HiHeart, HiTrash, HiReply, HiPlus, HiStar, HiBan, HiMinus } from 'react-icons/hi';
import PageLoader from './PageLoader';
import { formatDistanceToNow } from 'date-fns';
import { current } from '@reduxjs/toolkit';
import { HiEllipsisVertical, HiExclamationTriangle, HiPhoneArrowDownLeft } from 'react-icons/hi2';
import { Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { updateSuccess } from '../redux/slices/user.slice';
import LoaderPopup from './Loader';
import PopupWindow from '../Pages/PopupWindow';

const HighlightViewer = ({highlight, highlights, setHighlights, onClose, heading }) => {
  // highlight: current highligth
  // highlights: collection of all highlights takes here as parameter only to manage delete highlights and re render to update ui
  // stories: stories inside current highlights takes here as parameter only to manage delete highlights and re render to update ui
  const { currentUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [myHighlightStories, setMyHighlightStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteHighlightLoading, setDeleteHighlightLoading] = useState(false);
  const [deleteStoryLoading, setDeleteStoryLoading] = useState(false);
  const [noStoryPopup, setNoStoryPopup] = useState(false);
  
  useEffect(()=>{
    try {      
      const getStoriesOfHighlights = async ()=>{
        const response = await fetch(apiEndPoints.getStoriesOfHighlight(highlight?._id, currentUser?._id));
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.message || "Network response isn't ok while fetching highlight stories")
        }

        if(data.success){
          setMyHighlightStories(data?.data);
          //console.log("ny stories", myHighlightStories)
        }
      }
      getStoriesOfHighlights();
    } catch (error) {
      //console.log(error)
    }
  }, [highlight])
  


  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setProgress(0);
      return (prevIndex + 1) % myHighlightStories.length;
    });
  }, [myHighlightStories.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setProgress(0);
      return (prevIndex - 1 + myHighlightStories.length) % myHighlightStories.length;
    });
  }, [myHighlightStories.length]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handlePlay = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleMouseOver = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleClick = useCallback((e) => {
    const clickPosition = e.clientX;
    const screenWidth = window.innerWidth;

    if (clickPosition < screenWidth / 2) {
      handlePrev(); // Trigger prev if clicked on the left half
    } else {
      handleNext(); // Trigger next if clicked on the right half
    }
  }, [handleNext, handlePrev]);

  useEffect(() => {
    let timer;
    let progressInterval;

    if (!isPaused) {
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            return 0;
          }
        });
      }, 50); // Progress bar updates every 50ms

      timer = setInterval(() => {
        const prev = currentIndex;
        setCurrentIndex((prevIndex) => {
          setProgress(0);
          return (prevIndex + 1) % myHighlightStories.length;
        });

        
      }, 5000); // Change story every 5 seconds
    }

    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
    };
  }, [isPaused, myHighlightStories.length]);
  

  const handleLikeButtonClick = async(e)=>{
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await fetch(apiEndPoints.likeStoryAddress(myHighlightStories[currentIndex]?._id, currentUser?._id), {method: "PATCH"})
      const data = await response.json();
  
      if(!response.ok){
        throw new Error(data?.message || "Network response isn't ok while liking the story")
      }
  
      if(data.success){
        dispatch(updateSuccess(data?.data?.currentUser))
        //console.log(data);
      }    
    } catch (error) {
      alert(error.message)
      //console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  const handleReplyButtonClick = async(e)=>{
    e.stopPropagation();
    //console.log("clickekd")
  }
  const handleReportButtonClick = async(e)=>{
    e.stopPropagation();
    //console.log("clickekd")
  }
  const handleDeleteButtonClick = async(e)=>{
    e.stopPropagation();
    //console.log("clickekd")
  }
  const handleAddToHighlightButtonClick = async(e)=>{
    e.stopPropagation();
    //console.log("clickekd")
  }


  const handleDeleteHighlight = async (e)=>{
    e.stopPropagation();
    // //console.log("highlight ot delete", highlight)
    // return;
    setDeleteHighlightLoading(true)
    try {
        
        //console.log("triggered or not")
        const response = await fetch(apiEndPoints.deleteHighlightAddress(currentUser?._id, highlight?._id), {method: "DELETE"});
        const data = await response.json();

        if(!response.ok){
          throw new Error(data?.message || "network response isnt' ok while deleting highlights")
        }

        if(data.success){
          //console.log(data)
          //   //console.log("before deletion", highlights);
          //   const updatedHighlights = highlights.filter(highlight=>highlight?._id !== deletedHighlight);
          //   //console.log("after deletion", updatedHighlights);
          
          const deletedHighlight = data?.data?.deletedHighlight
          setHighlights(highlights.filter(highlight=>highlight?._id !== deletedHighlight?._id))
        //   setHighlights(updatedHighlights);
          dispatch(updateSuccess(data?.data?.currentUser));
          onClose(false)
        }
      } catch (error) {
      //console.log(error);
    }
    finally{
      setDeleteHighlightLoading(false)
    }
  }

  const removeStoryFromHighlight = async (e, story)=>{
      e.stopPropagation();
      setDeleteHighlightLoading(true)
      try {
        const response = await fetch(apiEndPoints.removeStoryFromHighlights(highlight?._id, story?._id, currentUser?._id), {method: "POST"});
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message || "Network response isn't ok while removing story from highlights")
        }

        if(data.success){
          const updatedhighlight = data?.data?.currentHighlight;
          const removedStory = data?.data?.currentStory;
          const updatedHighlights = highlights.filter(highlight=>highlight?._id === updatedhighlight?._id ? updatedhighlight : highlight)
          const udpatedStory = myHighlightStories.filter(story=>story?._id !== removedStory?._id);
          setMyHighlightStories(udpatedStory)
          setHighlights(updatedHighlights)
          dispatch(updateSuccess(data?.data?.currentUser));
        }

      } catch (error) {
        alert(error.message);
      }
      finally{
        setDeleteHighlightLoading(false)
      }
  }
  const handleDeleteStoryButtonClick = async(e)=>{
    e.stopPropagation();
    try {
      setDeleteStoryLoading(true)
      const response  = await fetch(apiEndPoints.deleteStoryAddress(myHighlightStories[currentIndex]?._id, currentUser?._id), {method: "DELETE"});
      const data = await response.json();
  
      if(!response.ok){
        throw new Error(data.message || "Network response is not ok while deleting story!")
      }
  
      if(data.success){
        dispatch(updateSuccess(data?.data?.currentUser));
        const deletedStory = data?.data?.deletedStory;
        const udpatedStories = myHighlightStories.filter(story=>story?._id !== deletedStory?._id)
        setMyHighlightStories(udpatedStories); 
        
        if(currentIndex === myHighlightStories.length){
          onClose(false)
        }
        // //console.log(currentIndex, myHighlightStories.length)
      }
    } catch (error) {
      //console.log(error);
    }
    finally{
      setDeleteStoryLoading(false)
    }
  }

  // if(myHighlightStories.length === 0){
  //   return <h1 className=''> No Stories added to this highlight yet!</h1>
  // }
  
  if(myHighlightStories.length === 0){
    return <h2 className=' p-2 rounded-lg  mb-3 text-white bg-gray-500 font-bold'> Highlight is empty! Please make new collection to show the world your best moments!</h2>
  }

  //console.log(highlight)
  return (
    <div className="fixed inset-0 bg-opacity-90 flex flex-col items-center justify-center bg-black z-50">
      <div onClick={handleClick} className="relative flex justify-center w-full min-h-screen bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
        {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"updating like data!"} />}
        {deleteHighlightLoading && <LoaderPopup loading={deleteHighlightLoading} setLoading={setDeleteHighlightLoading} info={`Deleting ${highlight?.name} highlight, please wait!`} />}
        {deleteStoryLoading && <LoaderPopup loading={deleteStoryLoading} setLoading={setDeleteStoryLoading} info={'deleting story! please wait!'} />}
        {/* {noStoryPopup && <PopupWindow heading={"Highlight Empty!"} information={"Please add some stories here to see your collectionss"} setShowPopup={setNoStoryPopup} />} */}
        <div className='flex flex-col gap-2 md:px-2'>
          <div className='flex flex-col md:flex-row'>
            <h1 className='w-full flex justify-center items-center mt-3 tracking-wider font-bold text-black dark:text-white text-lg '> {heading} ({currentIndex+1}/{myHighlightStories.length}) </h1>
            {highlight && 
              <div className='w-full flex justify-center md:relative top-3'>
                {currentUser?._id === highlight?.author && <Button onClick={handleDeleteHighlight} color={'failure'} className='text-nowrap w-32'> Delete Highlight </Button>}
              </div>
            }
          </div>

          
          <div
            className="w-full p-2 flex items-center justify-center rounded-lg"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            <div className="w-full mx-auto" >
              {myHighlightStories[currentIndex] && <p className='w-full flex items-center justify-center'>uploaded: {formatDistanceToNow(myHighlightStories[currentIndex]?.createdAt, {addSuffix: true})} </p>}
              <div className='flex'>
                <img src={myHighlightStories[currentIndex]?.contentURL} alt="Story" className="w-full h-auto cursor-pointer max-h-screen object-contain rounded-xl" />
                <div className='flex flex-col'>
                    <button onClick={() => onClose(false)} className="absolute dark:bg-gray-600 dark:text-white bg-red-600 text-white rounded-lg right-2 text-xl p-2">
                      <HiX />
                    </button>
                    <div className='cursor-pointer relative top-20 right-8  rounded-lg pl-2'>
                      {/* <HiDotsCircleHorizontal className='text-lg ' onClick={(e)=>{e.stopPropagation();setShowDropdown(true)}}/> */}
                      <div className='w-10 md:w-36 bg-white dark:bg-gray-700 h-24 flex flex-col justify-between py-2 rounded-lg pl-2'>
                      {currentUser?._id !== myHighlightStories[currentIndex]?.user && 
                          <div onClick={handleLikeButtonClick} className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'> 
                          {currentUser?.likedStories?.includes(myHighlightStories[currentIndex]?._id) ?                  
                            <div className='flex items-center justify-center gap-2'> <HiHeart className='text-red-500'/> <span className='hidden md:inline'> Liked </span> </div> :
                            <div className='flex items-center justify-center gap-2'> <HiHeart className=''/> <span className='hidden md:inline'> Like </span> </div> 
                          }
                          </div>}                        {currentUser?._id !== highlight?.author && <p className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'> <HiReply className=''/> <span className='hidden md:inline'> Reply </span> </p>}
                        {currentUser?._id !== highlight?.author && <p className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'>  <HiExclamationTriangle className=''/> <span className='hidden md:inline'> Report </span>  </p>}
                        {currentUser?._id === highlight?.author && <p onClick={handleDeleteStoryButtonClick} className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'> <HiTrash className=''/> <span className='hidden md:inline'> Delete </span> </p>}
                        {currentUser?._id === highlight?.author && <p onClick={(e)=>removeStoryFromHighlight(e, myHighlightStories[currentIndex])} className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'>  <HiMinus className=''/> <span className='hidden md:inline'> Highlights </span>  </p>}
                        <span>  </span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-2">
          {isPaused ? (
            <button onClick={handlePlay} className="bg-white dark:bg-gray-600 p-2 rounded-full">
              <HiPlay className="text-black dark:text-white text-xl" />
            </button>
          ) : (
            <button onClick={handlePause} className="bg-white dark:bg-gray-600 p-2 rounded-full">
              <HiPause className="text-black dark:text-white text-xl" />
            </button>
          )}
        </div>
        <div className="absolute top-0 h-2 left-0 w-full bg-gray-400">
          <div
            className="h-full bg-blue-500 dark:bg-blue-300 transition-all duration-50"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HighlightViewer;
