import React, { useState, useEffect, useCallback, useReducer, useRef } from 'react';
import { HiX, HiPause, HiPlay, HiDotsHorizontal, HiDotsVertical, HiOutlineDotsVertical, HiSwitchVertical, HiDotsCircleHorizontal, HiHeart, HiTrash, HiReply, HiPlus, HiStar, HiBan } from 'react-icons/hi';
import PageLoader from './PageLoader';
import { formatDistanceToNow } from 'date-fns';
import { current } from '@reduxjs/toolkit';
import { HiEllipsisVertical, HiExclamationTriangle, HiPhoneArrowDownLeft } from 'react-icons/hi2';
import { Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { updateSuccess } from '../redux/slices/user.slice';
import LoaderPopup from './Loader';

const StoryViewer = ({index, highlight, stories, setStories, onClose,heading }) => {
  const { currentUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(index < 0 ? 0 : index);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [storyTime, setStoryTime] = useState(5000)
  const [countDownTimer, setCountDownTimer] = useState(5)
  const [loading, setLoading] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false)
  const videoRef = useRef();
  // const [showDropdown, setShowDropdown] = useState(false);

  // console.log(stories)
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setProgress(0);
      return (prevIndex + 1) % stories.length;
    });
  }, [stories.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setProgress(0);
      return (prevIndex - 1 + stories.length) % stories.length;
    });
  }, [stories.length]);

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
    // console.log(videoRef.current);
    let timer;
    let progressInterval;
  
    if (!isPaused) {
      // Update countDownTimer every second
      progressInterval = setInterval(() => {
        setCountDownTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      // Change story every 5 seconds
      timer = setInterval(() => {
        
        setCurrentIndex((prevIndex) => {
          setCountDownTimer(countDownTimer); // Reset the countdown timer to 5 seconds
          return (prevIndex + 1) % stories.length;
        });
      }, 5000);
    }
  
    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
    };
  }, [isPaused, stories.length, currentIndex]);

  const handleDeleteHighlight = async (e)=>{
    e.stopPropagation();
    console.log(highlight)
    try {
        
        console.log("triggered or not")
        const response = await fetch(apiEndPoints.deleteHighlightAddress(currentUser?._id, highlight?._id), {method: "DELETE"});
        const data = await response.json();

        if(!response.ok){
          throw new Error(data?.message || "network response isnt' ok while deleting highlights")
        }

        if(data.success){
          console.log(data)

          
          dispatch(updateSuccess(data?.data?.currentUser));
        }
      } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    const video = videoRef.current;

    // Check if videoRef.current is defined
    if (video) {
        setCountDownTimer(60)
        const handleLoadedMetadata = () => {
            // Get the duration in seconds
            console.log(video.duration);
        };

        // Add event listener to update duration once metadata is loaded
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        // Cleanup event listener on component unmount
        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }
    else{
      setCountDownTimer(5)
    }
}, [currentIndex]);

const handleLikeButtonClick = async(e)=>{
  e.stopPropagation();
  try {
    setLoading(true);
    const response = await fetch(apiEndPoints.likeStoryAddress(stories[currentIndex]?._id, currentUser?._id), {method: "PATCH"})
    const data = await response.json();

    if(!response.ok){
      throw new Error(data?.message || "Network response isn't ok while liking the story")
    }

    if(data.success){
      dispatch(updateSuccess(data?.data?.currentUser))
      console.log(data);
    }    
  } catch (error) {
    alert(error.message)
    console.log(error)
  }
  finally{
    setLoading(false)
  }
}
const handleReplyButtonClick = async(e)=>{
  e.stopPropagation();
  console.log("clickekd")
}
const handleReportButtonClick = async(e)=>{
  e.stopPropagation();
  console.log("clickekd")
}
const handleDeleteStoryButtonClick = async(e)=>{
  e.stopPropagation();
  try {
    setDeleteLoading(true)
    const response  = await fetch(apiEndPoints.deleteStoryAddress(stories[currentIndex]?._id, currentUser?._id), {method: "DELETE"});
    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || "Network response is not ok while deleting story!")
    }

    if(data.success){
      dispatch(updateSuccess(data?.data?.currentUser));
      const deletedStory = data?.data?.deletedStory;
      const udpatedStories = stories.filter(story=>story?._id !== deletedStory?._id)
      setStories(udpatedStories);
      setCurrentIndex((prevIndex) => {
        // setCountDownTimer(countDownTimer); // Reset the countdown timer to 5 seconds
        return (prevIndex + 1) % (stories.length-1);
      });      
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
  finally{
    setDeleteLoading(false)
  }
}
const handleAddToHighlightButtonClick = async(e)=>{
  e.stopPropagation();
  console.log("clickekd")
}
  
return (
  <div className="fixed inset-0 bg-opacity-95 flex items-center justify-center bg-black z-50">
    {/* Main Container */}
    <div
      onClick={handleClick}
      className="relative flex flex-col justify-between w-full h-full max-w-3xl p-4 bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"
    >
      {/* Loading Popups */}
      {loading && (
        <LoaderPopup
          loading={loading}
          setLoading={setLoading}
          info="Updating data for liked users! Please wait..."
        />
      )}
      {deleteLoading && (
        <LoaderPopup
          loading={deleteLoading}
          setLoading={setDeleteLoading}
          info="Deleting story, please wait!"
        />
      )}

      {/* Story Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg md:text-xl font-bold text-white">
          {heading} ({currentIndex + 1}/{stories.length})
        </h1>
        {highlight && currentUser?._id === highlight?.author && (
          <Button
            onClick={handleDeleteHighlight}
            color={'failure'}
            className="text-sm md:text-base"
          >
            Delete Highlight
          </Button>
        )}
      </div>

      {/* Story Content */}
      <div
        className="flex-1 flex items-center justify-center"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative">
          {/* Uploaded Time */}
          <p className="text-sm text-gray-400 text-center mb-2">
            Uploaded: {formatDistanceToNow(stories[currentIndex]?.createdAt, { addSuffix: true })}
          </p>

          {/* Story Media */}
          <div className="flex">
            {stories[currentIndex]?.type === 'image' ? (
              <img
                src={stories[currentIndex].contentURL}
                alt="Story"
                className="max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                className="max-h-[80vh] object-contain rounded-lg"
              >
                <source src={stories[currentIndex]?.contentURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Story Controls */}
            <div className="absolute w-10 top-2 right-2 flex flex-col space-y-2">
              <button
                onClick={() => onClose(false)}
                className="bg-red-600 text-white rounded-full p-2 text-xl md:z-10 relative md:left-10 md:top-4"
              >
                <HiX />
              </button>

              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg md:w-32 relative bottom-28 md:bottom-28 md:right-10">
                {currentUser?._id !== stories[currentIndex]?.user && (
                  <>
                    <button
                      onClick={handleLikeButtonClick}
                      className="flex items-center gap-2 text-sm md:text-base hover:text-lg"
                    >
                      <HiHeart className={`text-lg ${currentUser?.likedStories?.includes(stories[currentIndex]?._id) ? 'text-red-500' : ''} hover:text-lg`} />
                      <span className="hidden md:inline">
                        {currentUser?.likedStories?.includes(stories[currentIndex]?._id) ? 'Liked' : 'Like'}
                      </span>
                    </button>

                    <button
                      onClick={handleReplyButtonClick}
                      className="flex items-center gap-2 text-sm md:text-base hover:text-lg"
                    >
                      <HiReply className="text-lg" />
                      <span className="hidden md:inline">Reply</span>
                    </button>

                    <button
                      onClick={handleReportButtonClick}
                      className="flex items-center gap-2 text-sm md:text-base hover:text-lg"
                    >
                      <HiExclamationTriangle className="text-lg" />
                      <span className="hidden md:inline">Report</span>
                    </button>
                  </>
                )}

                {currentUser?._id === stories[currentIndex]?.user && (
                  <>
                    <button
                      onClick={handleDeleteStoryButtonClick}
                      className="flex items-center gap-2 text-sm md:text-base hover:text-lg"
                    >
                      <HiTrash className="text-lg" />
                      <span className="hidden md:inline">Delete</span>
                    </button>

                    <button
                      onClick={handleAddToHighlightButtonClick}
                      className="flex items-center gap-2 text-sm md:text-base hover:text-lg"
                    >
                      <HiPlus className="text-lg hover:text-lg" />
                      <span className="hidden md:inline hover:text-lg">Highlight</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Controls - Bottom */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={isPaused ? handlePlay : handlePause}
          className="bg-white dark:bg-gray-600 p-2 rounded-full"
        >
          {isPaused ? (
            <HiPlay className="text-black dark:text-white text-xl" />
          ) : (
            <HiPause className="text-black dark:text-white text-xl" />
          )}
        </button>

        {/* Countdown Timer */}
        <div className="relative top-1 left-2 font-bold border w-8 h-8 md:w-10 md:h-10 flex justify-center items-center rounded-full bg-white text-black">
          {countDownTimer}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-600">
        <div
          className="h-full bg-blue-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

};

export default StoryViewer;
