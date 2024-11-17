import { Alert, Button, Modal, TextInput } from "flowbite-react";

export default function GlobalModal({showModal, setShowModal, heading, information, onAgree

}){
    return <Modal show={showModal} onClose={() => setShowModal(false)}>
    <Modal.Header>
      <Alert color={"warning"}> {heading || "Warning"} </Alert>
    </Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {information || "Are you sure you want to delete this post? This action cannot be undone."}
        </p>
      </div>
    </Modal.Body>
    <Modal.Footer className='flex justify-between'>
      <Button color="failure" onClick={onAgree}>
        Yes, Delete this post.
      </Button>
      <Button color="gray" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
}