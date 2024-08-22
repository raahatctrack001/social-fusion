import React from 'react';

const CommentsDisabled = () => {
  return (
    <div className="flex items-center justify-center p-4 my-2 border border-gray-300 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-2.121 2.121a2 2 0 00-.293 2.515l1.414 2.828a2 2 0 01-.465 2.487l-3 3A8.001 8.001 0 113 12h3.293a1 1 0 00.707-.293l3-3a1 1 0 00-.707-1.707L5 12V9a1 1 0 011-1h3l1.414-1.414a1 1 0 011.293-.117l2.828-1.414a2 2 0 002.515.293l2.121-2.121a1 1 0 111.415 1.415z"
        />
      </svg>
      <p className="text-gray-600">Comments have been disabled for this post.</p>
    </div>
  );
};

export default CommentsDisabled;
