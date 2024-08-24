import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';

const CommentForm = ({placeholder, buttonText, keepX, commentContent, setShowCommentForm, setCommentContent, handleCommentSubmit }) => {

    return (
        <form onSubmit={handleCommentSubmit} className="w-full mx-auto p-4 dark:bg-[rgb(16,23,42)] border rounded-lg shadow-md">
            <div className='flex justify-between'>            
                <h2 className="text-lg font-semibold mb-4">Leave a {keepX ? "Reply" : "Comment" }</h2> {keepX && <div className='' onClick={()=>setShowCommentForm(false)}> <HiX className='dark:text-white' /> </div>}
            </div>
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-[rgb(16,23,42)] focus:ring-blue-500"
                    placeholder={placeholder}
                    rows="4"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    
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
    );
};

export default CommentForm;
