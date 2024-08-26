import React, { useState, useEffect, useCallback } from 'react';
import { HiX, HiPause, HiPlay, HiDotsHorizontal, HiDotsVertical, HiOutlineDotsVertical, HiSwitchVertical, HiDotsCircleHorizontal } from 'react-icons/hi';
import PageLoader from './PageLoader';
import { formatDistanceToNow } from 'date-fns';
import { current } from '@reduxjs/toolkit';
import { HiEllipsisVertical } from 'react-icons/hi2';

const StoryViewer = ({ stories, onClose,heading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  console.log(stories)
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
  if(stories.length === 0){
    return <PageLoader />
  }
  return (
    <div className="fixed inset-0 bg-opacity-90 flex flex-col items-center justify-center bg-black z-50">
      <div onClick={handleClick} className="relative flex justify-center w-full min-h-screen bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
        <button onClick={() => onClose(false)} className="absolute dark:bg-gray-600 dark:text-white bg-red-600 text-white rounded-lg right-2 text-xl p-2">
          <HiX />
        </button>
        <div className='flex flex-col gap-2 md:px-2'>
          <div className='flex justify-between items-center'>
            <h1 className='w-full flex justify-center items-center mt-3 tracking-wider font-bold text-black dark:text-white text-lg '> {heading} ({currentIndex+1}/{stories.length}) </h1>
            <div className='cursor-pointer relative top-2 right-5'>
              <HiDotsCircleHorizontal className='text-lg '/>
            </div>
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
              <img src={stories[currentIndex].contentURL} alt="Story" className="w-full h-auto cursor-pointer max-h-screen object-contain" />
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

export default StoryViewer;
