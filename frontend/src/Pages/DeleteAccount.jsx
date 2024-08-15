import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';

function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = () => {
    // Logic for deleting the account
    setShowModal(false);
  };

  return (
    <>
      <Button color="failure" onClick={() => setShowModal(true)}>
        Delete Account
      </Button>
      
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          Warning
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteAccount}>
            Yes, Delete My Account
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccount;
