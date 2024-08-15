import React, { useState } from 'react';

function PopupWindow() {
  const [showPopup, setShowPopup] = useState(false);

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md"
        onClick={togglePopup}
      >
        Open Popup
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">This is a popup window</h2>
            <p className="text-gray-600 mb-4">
              You can put any content you like here. This popup appears on clicking the button and can be closed by clicking the close button below.
            </p>
            <button
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md"
              onClick={()=>setShowPopup(!showPopup)}
            >
              Close Popup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupWindow;
