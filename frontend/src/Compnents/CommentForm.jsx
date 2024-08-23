import React, { useState } from 'react';

const CommentForm = ({commentContent, setCommentContent, handleCommentSubmit }) => {

    return (
        <form onSubmit={handleCommentSubmit} className="w-full mx-auto p-4 dark:bg-[rgb(16,23,42)] border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Leave a Comment</h2>
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 dark:bg-[rgb(16,23,42)] focus:ring-blue-500"
                    placeholder="Write your comment..."
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
                    Post Comment
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
