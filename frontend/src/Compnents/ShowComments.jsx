import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Dropdown } from 'flowbite-react';
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const   ShowComments = ({ localComments, handleLikeCommentClick, handleReplyClick, commentReplies, showReplyBox }) => {
    const { currentUser } = useSelector(state=>state.user)
  return (
    <div><div className="rounded-lg">
    {localComments?.length > 0 && localComments.map((comment, index) => (
        <div key={index} className="border-2 border-black p-3 my-2 rounded-lg">
            {/* Username and Timestamp */}
            <div className="flex justify-between items-center mb-2 border-b border-black">
                <Link to={`/authors/author/${comment?.author?._id}`} className="font-semibold">{comment?.author?.username}</Link>
                <div className="text-sm text-gray-500">{formatDistanceToNow(new Date(comment?.updatedAt), { addSuffix: true })}</div>
            </div>

            {/* Comment Content */}
            <div className="mb-2">
                {comment?.content}
            </div>

            {/* Likes, Reply, Upvote */}
            <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-5">
                    <div className="text-sm font-semibold">{comment?.likes?.length} likes</div>
                    <div className="flex space-x-4">
                        <div className="flex gap-5 items-center">
                            <button onClick={() => handleReplyClick(comment)} className="text-sm text-gray-500">
                                {comment.replies?.length > 0 ? "Replies" : "Reply"} ({comment?.replies?.length})
                            </button>
                            <Dropdown
                                arrowIcon={false}
                                inline={true}
                                label={<HiDotsHorizontal className="text-lg text-gray-500" />}
                            >
                                <Dropdown.Item onClick={() => alert("Edit comment")}>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => alert("Delete comment")}>
                                    Delete
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => alert("Report comment")}>
                                    Report
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => handleLikeCommentClick(comment?._id, currentUser?._id)}
                    className="text-blue-500 font-semibold"
                >
                    {currentUser?.likedComments?.includes(comment?._id)
                        ? <HiHeart className="text-lg text-red-700" />
                        : <HiOutlineHeart className="text-lg text-black" />}
                </button>
            </div>
            {commentReplies[comment?.id] && <h1> reply box should be shown here</h1>}
        </div>
    ))}
</div></div>
  )
}

export default ShowComments