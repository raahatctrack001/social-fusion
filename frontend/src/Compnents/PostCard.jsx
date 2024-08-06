import React from 'react';

const PostCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full"
        src="https://via.placeholder.com/400x200"
        alt="Card image"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Card Title</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla.
        </p>
      </div>
      <div className="px-6 py-4 flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src="https://via.placeholder.com/150"
          alt="Author"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">Author Name</p>
          <p className="text-gray-600">Author Title</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
