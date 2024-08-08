import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="min-w-full md:min-w-52 rounded-2xl overflow-hidden shadow-lg hover:bg-slate-300 hover:shadow-gray-400">
      <div className="flex items-center p-4">
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">
          {post.content}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
      <div className='flex justify-between'>
        <div className='order-1'>
          <img className="w-12 h-12 rounded-full mr-4" src={post.author.photo} alt="Author" />
          <div className="text-sm">
            <p className="text-gray-900 leading-none font-bold">{post.author.name}</p>
            <p className="text-gray-600">{post.author.username}</p>
          </div>
        </div>

        <div>
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PostCard;
