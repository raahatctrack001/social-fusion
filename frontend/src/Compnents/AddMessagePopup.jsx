import React, { useState } from 'react';

export default function AddMessagePopup({ isOpen, onClose, onSave }) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center w-full items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl p-6 relative ">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Message for Easy Tracking
        </h2>
        
        {/* Input Box */}
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => onSave(message)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            onClick={()=>onClose(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
