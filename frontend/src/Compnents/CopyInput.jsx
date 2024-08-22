import { Alert } from 'flowbite-react';
import React, { useState } from 'react';
import { HiArrowDown, HiPhotograph, HiX } from 'react-icons/hi';

const CopyInput = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 4000); // Reset "Copied!" text after 2 seconds
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-md shadow-md">
      <p className="text-lg font-semibold mb-2">Copy this URL:</p> 
      <div className="flex items-center space-x-2 w-full max-w-md">
        <input
          type="text"
          value={url}
          readOnly
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleCopy}
          className={`p-2 rounded-md ${isCopied ? 'bg-green-500' : 'bg-blue-500'} hover:bg-opacity-80 transition duration-300`}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>

      </div>
      {isCopied && <Alert color={'warning'} className='hidden md:inline my-2 p-1 px-2 '> Please ensure that your cursor is positioned at the desired location before inserting the image. </Alert>}
      {isCopied && <Alert color={'warning'} className='md:hidden my-2 p-1 px-2 '> Now click on the three dots and select <HiPhotograph className='inline' /> to paste the URL. </Alert>}
       {isCopied && <div className='hidden w-full md:flex justify-end items-center gap-2 cursor-pointer relative pr-8'> <span> Paste here at <HiPhotograph className='inline'/> </span> <HiArrowDown /> </div>}
    </div>
  );
};

export default CopyInput;
