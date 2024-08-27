import React, { useState, useEffect, useCallback } from 'react';
import { HiX, HiPause, HiPlay, HiDotsHorizontal, HiDotsVertical, HiOutlineDotsVertical, HiSwitchVertical, HiDotsCircleHorizontal, HiHeart, HiTrash, HiReply, HiPlus, HiStar, HiBan } from 'react-icons/hi';
import PageLoader from './PageLoader';
import { formatDistanceToNow } from 'date-fns';
import { current } from '@reduxjs/toolkit';
import { HiEllipsisVertical, HiExclamationTriangle, HiPhoneArrowDownLeft } from 'react-icons/hi2';
import { Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { updateSuccess } from '../redux/slices/user.slice';

const HighlightViewer = ({highlight, highlights, setHighlights, stories, onClose,heading }) => {
  const { currentUser } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
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
        setCurrentIndex((prevIndex) => {
          setProgress(0);
          return (prevIndex + 1) % stories.length;
        });
      }, 5000); // Change story every 5 seconds
    }

    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
    };
  }, [isPaused, stories.length]);

  if(stories?.length === 0){
    setTimeout(() => {
      <PageLoader />
    }, 5000);

    onClose(false)
  }
  

  const handleButtonClick = (event)=>{
    
      // Prevent the global area click event from being triggered
      event.stopPropagation();
      console.log('Inner div clicked!');
    
  }

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
          //   console.log("before deletion", highlights);
          //   const updatedHighlights = highlights.filter(highlight=>highlight?._id !== deletedHighlight);
          //   console.log("after deletion", updatedHighlights);
          
          const deletedHighlight = data?.data?.deletedHighlight
          setHighlights(highlights.filter(highlight=>highlight?._id !== deletedHighlight?._id))
        //   setHighlights(updatedHighlights);
          dispatch(updateSuccess(data?.data?.currentUser));
          onClose(false)
        }
      } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="fixed inset-0 bg-opacity-90 flex flex-col items-center justify-center bg-black z-50">
      <div onClick={handleClick} className="relative flex justify-center w-full min-h-screen bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
        
        <div className='flex flex-col gap-2 md:px-2'>
          <div className='flex flex-col md:flex-row'>
            <h1 className='w-full flex justify-center items-center mt-3 tracking-wider font-bold text-black dark:text-white text-lg '> {heading} ({currentIndex+1}/{stories.length}) </h1>
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

            <div className="w-full mx-auto">
              <p className='w-full flex items-center justify-center'>uploaded: {formatDistanceToNow(stories[currentIndex]?.createdAt, {addSuffix: true})} </p>
              <div className='flex'>
                <img src={stories[currentIndex].contentURL} alt="Story" className="w-full h-auto cursor-pointer max-h-screen object-contain rounded-xl" />
                <div className='flex flex-col'>
                    <button onClick={() => onClose(false)} className="absolute dark:bg-gray-600 dark:text-white bg-red-600 text-white rounded-lg right-2 text-xl p-2">
                      <HiX />
                    </button>
                    <div className='cursor-pointer relative top-20 right-8  rounded-lg pl-2'>
                      {/* <HiDotsCircleHorizontal className='text-lg ' onClick={(e)=>{e.stopPropagation();setShowDropdown(true)}}/> */}
                      <div onClick={handleButtonClick} className='w-10 md:w-36 bg-white dark:bg-gray-700 h-24 flex flex-col justify-between py-2 rounded-lg pl-2'>
                        {currentUser?._id !== highlight?.author && <p className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'> <HiHeart className=''/> <span className='hidden md:inline'> Like </span> </p>}
                        {currentUser?._id !== highlight?.author && <p className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'> <HiReply className=''/> <span className='hidden md:inline'> Reply </span> </p>}
                        {currentUser?._id !== highlight?.author && <p className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'>  <HiExclamationTriangle className=''/> <span className='hidden md:inline'> Report </span>  </p>}
                        {currentUser?._id === highlight?.author && <p className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'> <HiTrash className=''/> <span className='hidden md:inline'> Delete </span> </p>}
                        {currentUser?._id === highlight?.author && <p className=' hover:text-xl text-lg text-nowrap flex items-center gap-2 hover:font-bold'>  <HiPlus className=''/> <span className='hidden md:inline'> Highlights </span>  </p>}
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
