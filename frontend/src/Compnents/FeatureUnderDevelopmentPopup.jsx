import React from 'react';
import { Modal, Button } from 'flowbite-react';

const FeatureUnderDevelopmentPopup = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose} size="md" popup={true}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-yellow-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m0-4h.01M12 4.5v.01M6.878 6.87a4 4 0 105.657 5.657M7.757 9a2 2 0 112.828 2.828M11.97 4.514A7.5 7.5 0 118.121 17.121M15.9 9.9A3 3 0 1012 6a2.981 2.981 0 00-.9.141"
            />
          </svg>
          <h3 className="mb-5 text-lg font-medium text-gray-900">
            This Feature is Under Development
          </h3>
          <Button color="warning" onClick={onClose} className='w-full'>
            OK
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FeatureUnderDevelopmentPopup;
