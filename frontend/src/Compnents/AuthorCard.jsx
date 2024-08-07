import React from 'react';

const AuthorCard = ({ author }) => {
  return (
    <div className="min-w-56 rounded-3xl overflow-hidden shadow-lg p-4 bg-slate-300 flex flex-col flex-nowrap">
      <img className="w-32 h-32 rounded-full mx-auto" src={author.photo} alt={`${author.name} photo`} />
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">{author.name}</h2>
        <p className="text-gray-600">{author.bio}</p>
      </div>
      <div className="flex justify-center mt-4">
        <a href={author.twitter} className="text-blue-500 hover:underline mx-2">Twitter</a>
        <a href={author.linkedin} className="text-blue-500 hover:underline mx-2">LinkedIn</a>
      </div>
    </div>
  );
};

export default AuthorCard;
