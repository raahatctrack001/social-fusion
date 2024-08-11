import React from 'react';
import { Button } from 'flowbite-react'; // Import Flowbite Button component

const PostRegistration = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            You’re In!
          </h1>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl md:text-2xl">
            Now, Let’s Hear Your Voice
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-base text-gray-700 sm:text-lg md:text-xl lg:text-2xl">
            Congratulations on joining our community! Your journey as a writer
            starts right here, right now. The world is waiting to hear your
            story, your insights, and your unique perspective. Don’t let your
            thoughts stay bottled up—this is your space to let your creativity
            flow. Whether it’s sharing your experiences, voicing your opinions,
            or simply exploring new ideas, your blog is the canvas, and your
            words are the art. So go ahead, start typing, and let your voice be
            heard. Who knows? Your next post could be the one that inspires
            someone else!
          </p>
        </div>
        <div className="text-center mt-8">
          <Button
            color="primary"
            href="/login" // Adjust href to the actual login route or action
            className="w-full sm:w-auto"
          >
            Continue to Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostRegistration;
