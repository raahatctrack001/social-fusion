import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiTrash } from 'heroicons-react';
import { useSelector } from 'react-redux';

const SelectHighlightsPopup = ({ isOpen, onClose, highlights }) => {
    const { currentUser } = useSelector(state=>state.theme)
  return (
    <Modal show={isOpen} onClose={onClose} size="lg" position="center">
      <Modal.Header>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Your Highlights
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {highlights?.length > 0 &&
            highlights.map((highlight, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center min-h-20 min-w-20 md:h-32 md:w-32 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl cursor-pointer transition-transform transform hover:scale-105"
              >
                <div className="relative flex flex-col items-center justify-center mt-2">
                  <img
                    src={highlight?.thumbnail}
                    className="h-16 w-16 md:h-24 md:w-24 rounded-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 w-full text-center">
                  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg py-1 px-2 font-bold text-sm opacity-90">
                    {highlight?.name?.length > 13
                      ? highlight?.name?.substring(0, 13) + "..."
                      : highlight?.name}
                  </div>
                </div>
                {currentUser?._id === highlight?.author && (
                  <HiTrash
                    className="text-red-500 text-xl absolute top-2 right-2 bg-white dark:bg-gray-800 p-1 rounded-full z-10 hover:bg-gray-100 dark:hover:bg-gray-700"
                  />
                )}
              </div>
            ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} color="gray">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectHighlightsPopup;
