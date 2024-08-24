import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';

const EditCommentPopup = ({ placeholder, buttonText, keepX, commentContent, setCommentContent, setShowCommentForm, handleCommentSubmit }) => {
    const [editContent, setEditContent] = useState(commentContent)
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        handleCommentSubmit(editContent)
        setShowCommentForm(false)
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative w-full md:w-3/4 p-4 dark:bg-[rgb(16,23,42)] bg-white border rounded-lg shadow-lg">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-lg font-semibold">{keepX ? "Edit Reply" : "Edit Comment"}</h2>
                    {keepX && (
                        <button onClick={() => setShowCommentForm(false)} className="text-xl">
                            <HiX className='dark:text-white' />
                        </button>
                    )}
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <textarea
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-[rgb(16,23,42)] focus:ring-blue-500"
                            placeholder={placeholder}
                            rows="4"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCommentPopup;
