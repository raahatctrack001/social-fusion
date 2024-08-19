import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';

function PopupWindow({heading, information, showPopup, setShowPopup}) {
  // const [showPopup, setShowPopup] = useState(false);

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <button
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md"
        onClick={togglePopup}
      >
        Open Popup
      </button> */}

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{heading}</h2>
            <p className="text-gray-600 mb-4">
                {information}
            </p>
            <button
              className="px-4 flex justify-center items-center gap-2 py-2 bg-red-600 text-white font-semibold rounded-md"
              onClick={()=>setShowPopup(!showPopup)}
            >
              <HiX /> Close              
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupWindow;
