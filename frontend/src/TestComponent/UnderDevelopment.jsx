import { Button } from 'flowbite-react';
import React from 'react';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';

function UnderDevelopment() {
  return (
    <div className="min-h-screen flex items-center justify-center  dark:bg-gray-900 dark:text-white">
      <div className="m-4 p-4 dark:bg-gray-800 dark:text-white  shadow-lg rounded-lg text-center">
        <HiOutlineWrenchScrewdriver className="mx-auto h-20 w-20 text-yellow-500" />
        <h1 className="mt-6 text-3xl font-bold dark:text-white">
          Page Under Development
        </h1>
        <p className="mt-4 text-gray-600">
          This feature is currently under development. We're working hard to get it up and running as soon as possible. Please check back later!
        </p>
        <div className="mt-6">
          <Button
            href="/"
            className="inline-block px-6 py-2 mb-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Go Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UnderDevelopment;
