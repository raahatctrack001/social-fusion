import React from 'react';
import { Modal, Button } from 'flowbite-react';

const PasswordResetSuccessPopup = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose} size="md" popup={true}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="mb-5 text-lg font-medium text-gray-900">
            Password Reset Successfully
          </h3>
          <Button color="success" onClick={onClose} className='w-full'>
            OK
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordResetSuccessPopup;
