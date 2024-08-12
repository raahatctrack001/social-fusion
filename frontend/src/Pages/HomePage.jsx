import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="relative h-screen bg-[url('../../public/dev.jpeg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-85"></div>
        <div className="relative z-10 text-white text-center flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl font-bold">Welcome to the Digital Kingdom of Soul</h1>
          <p className="text-xl mt-4">Experience the Fusion of Technology and Spirit</p>
          <div className='flex flex-col md:flex-row md:gap-5'>
            <Link to={"/register"} className="mt-8 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-500">Register Now</Link>
            <span className="md:mt-8 px-4 py-2 rounded-l"> OR </span>
            <Link to={"/sign-in"} className="md:mt-8 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-500">Sign In</Link>
          </div>
          <h1 className="mt-5 text-4xl font-bold">to continue</h1>


        </div>
        
    </div>
  );
};

export default HomePage;
