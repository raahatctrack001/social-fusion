import React, { useState, useEffect } from 'react';
import { HiX, HiPause, HiPlay } from 'react-icons/hi';

const StoryViewer = ({ stories, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

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
  }, [stories.length, isPaused, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      setProgress(0);
      return (prevIndex + 1) % stories.length;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      setProgress(0);
      return (prevIndex - 1 + stories.length) % stories.length;
    });
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handlePlay = () => {
    setIsPaused(false);
  };

  const handleMouseOver = () => {
    setIsPaused(true);
  };

  const handleMouseOut = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  const handleClick = (e) => {
    const clickPosition = e.clientX;
    const screenWidth = window.innerWidth;

    if (clickPosition < screenWidth / 2) {
      handlePrev(); // Trigger prev if clicked on the left half
    } else {
      handleNext(); // Trigger next if clicked on the right half
    }
  };
  return (
    <div className="fixed inset-0 bg-opacity-90 flex items-center justify-center bg-black z-50 m-5">
      <div onClick={handleClick} className="relative w-full md:w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
        <button onClick={() => onClose(false)} className="absolute dark:bg-gray-600 dark:text-white bg-red-600 text-white rounded-lg right-2 text-xl p-2">
          <HiX />
        </button>
        <div
          className="w-full max-h-3/4 p-2 flex items-center justify-center rounded-lg"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full max-w-lg mx-auto">
            <img src={stories[currentIndex]} alt="Story" className="w-full h-auto max-h-screen object-contain" />
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-400">
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
