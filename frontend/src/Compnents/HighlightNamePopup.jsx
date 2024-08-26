import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';

const HighlightNamePopup = ({ isOpen, onClose, onSave, selectHighlights }) => {
  const [highlightName, setHighlightName] = useState('');

  const handleSave = () => {
    if (highlightName.trim()) {
      onSave(highlightName);
      setHighlightName('');
      selectHighlights(true);
      onClose(false)
    }
    
  };

//   if (!isOpen) return null; // Close the popup if isOpen is false

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className='w-full flex justify-between'>
            <h2 className="text-xl font-bold mb-4 dark:text-gray-700">Enter Highlight Name</h2>
            <HiX className='cursor-pointer dark:text-black' onClick={()=>onClose(!isOpen)} />

        </div>
        <input
          type="text"
          value={highlightName}
          onChange={(e) => setHighlightName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-black"
          placeholder="Highlight Name"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={()=>onClose(!isOpen)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightNamePopup;
