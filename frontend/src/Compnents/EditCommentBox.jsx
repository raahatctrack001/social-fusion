import { Alert } from 'flowbite-react';
import React, { useState } from 'react';

const EditCommentBox = ({ comment, error, setEditContent, handleEditCommentClick, showEditCommentPopup, setShowEditCommentPopup }) => {
  const [content, setContent] = useState(comment?.content);

  return (
    <div className="fixed inset-0 flex items-start md:items-center justify-center bg-opacity-50 z-50">
      <div className="m-2 p-6 bg-gray-500  text-white dark:bg-gray-800 rounded-lg  shadow-lg w-full md:w-3/4 lg:1/2">
        <h2 className="text-lg font-semibold mb-4">Edit Comment</h2>
        {error && <Alert color={'warning'} className='py-2 my-2' > {error} </Alert>}
        <textarea
          className="w-full min-h-32 border text-black bg-white border-gray-300 rounded"
          value={content}
          onChange={(e) => {setEditContent(e.target.value), setContent(e.target.value)}}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded"
            onClick={()=>setShowEditCommentPopup(!showEditCommentPopup)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleEditCommentClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCommentBox;
