import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { HiChat, HiDotsHorizontal, HiOutlineThumbUp, HiThumbUp } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const CommentBox = ({ 
    comment, 
    handleReplyClick,
    handleEditClick,
    handleDeleteClick,
    handleReportClick,
    handleLikeClick,

}) => {
    const [showReplies, setShowReplies] = useState(false)
    const { currentUser } = useSelector(state=>state.user)
    

    return (
        <div className="w-full p-4 dark:bg-[rgb(16,23,42)] rounded-lg shadow-md dark:text-white">
            {/* Top Row: Username and Time */}
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment?.author?.username}</span>
                <span className="text-sm text-gray-400">{formatDistanceToNow(comment?.createdAt, {addSuffix: true})}</span>
            </div>

            {/* Middle Row: Comment Content */}
            <div className="mb-2">
                <p>{comment?.content}</p>
            </div>

            {/* Bottom Row: Like, Reply, and Options */}
            <div className="flex justify-between items-center">
                <div className='flex gap-5'>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 cursor-pointer" onClick={()=>handleLikeClick(comment?._id)}>
                            {currentUser?.likedComments?.includes(comment?._id) ? <HiOutlineThumbUp className="w-5 h-5 text-blue-500" /> : <HiThumbUp className="w-5 h-5 text-blue-500" />}
                            <span>{comment?.likes?.length}</span>
                        </div>
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <HiChat className="w-5 h-5 text-blue-500" />
                            <span>{comment?.replies?.length}</span>
                        </div>
                    </div>
                    <div className="relative flex gap-5">
                        <div className='cursor-pointer' onClick={()=>setShowReplies(!showReplies)}>
                            {showReplies ? <span>show replies</span> : <span> hide replies </span>}
                        </div>
                        <Dropdown
                            label={<HiDotsHorizontal className="w-5 h-5 cursor-pointer" />}
                            arrowIcon={false}
                            inline={true}
                            className="text-black dark:text-white"
                        >
                            <Dropdown.Item onClick={handleReplyClick}>
                                Reply
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleEditClick}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleDeleteClick(comment?._id)}>
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleReplyClick}>
                                Report
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <button
                        onClick={()=>handleLikeClick(comment?._id)}
                        className="flex items-center space-x-1 text-blue-500 hover:underline focus:outline-none"
                    >
                        {currentUser?.likedComments?.includes(comment?._id) ? <div><HiOutlineThumbUp className="w-5 h-5" />
                        <span>Like</span></div> :

                        <div><HiThumbUp className="w-5 h-5" />
                        <span>Liked</span></div>}

                         
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentBox;
