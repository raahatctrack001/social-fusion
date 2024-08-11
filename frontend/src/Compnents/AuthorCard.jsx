import { Button } from 'flowbite-react';
import React from 'react';
import { HiUserAdd } from 'react-icons/hi';

const AuthorCard = ({ author }) => {
  return (
    <div >
      
      <div className='flex justify-center items-center gap-5'>
        <img className='rounded-full h-10' src={author.profilePic} alt="author's photo"/>
        <div className='flex flex-col text-sm'>
          <p> {author.fullName} </p>
          <p> {author.username} </p>
        </div>
      </div>
      {/* <Button outline className='bg-gray-800 '> 
        <span className='flex justify-center items-center'> <HiUserAdd /> </span>
        <span className='hidden md:inline'> Follow </span>
      </Button> */}
    </div>
  );
};

export default AuthorCard;
