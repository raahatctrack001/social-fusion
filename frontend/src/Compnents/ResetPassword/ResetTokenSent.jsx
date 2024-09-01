import React from 'react';
import { FaClosedCaptioning } from 'react-icons/fa';

const ResetPasswordSentPopup = ({ isOpen, onClose, email, closeInputBox }) => {
  return (
    <div className={`fixed inset-0 z-20 bg-gray-800 bg-opacity-50 flex items-start top-20 justify-center transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="dark:bg-gray-700 dark:text-white bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={()=>{onClose(false), closeInputBox(false)}}
          className="absolute top-2 right-2"
        >
          &times;
        </button>
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Reset Token Sent</h2>
        {/* Message */}
        <p className="mb-4  text-center">
          {`Please check your email and click on the reset link sent at ${email}. The link is valid for the next 30 minutes.`}
        </p>
        {/* Optional Additional Info */}
        <p className=" text-center">
          If you don't see the email, please check your spam or junk folder.
        </p>
        {/* Close Button */}
        <button
          onClick={()=>{onClose(false), closeInputBox(false)}}
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordSentPopup;
