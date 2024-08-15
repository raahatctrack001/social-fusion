import React, { useState } from 'react';
import { HiBookmark, HiChartBar, HiClock, HiDotsVertical, HiFlag, HiLink, HiPencil, HiShare, HiStar, HiThumbUp, HiTrash } from 'react-icons/hi';
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function PostOptionsDropdown({post}) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector(state=>state.user)
  const navigate = useNavigate();
 console.log(currentUser)
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdatePostClick = ()=>{
    localStorage.setItem("postToUpdate", JSON.stringify(post))
    navigate(`/edit-post/${post?._id}`)
  }
  return (
    <div className="relative inline-block text-left z-10">
      <button
        type="button"
        onClick={handleToggle}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <HiDotsVertical className="w-5 h-5" />
      </button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                {currentUser?._id === post?.author?._id && 
                <div>
                    <div onClick={handleUpdatePostClick} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <HiPencil className="w-5 h-5 mr-3 text-gray-600" />
                      <span>Update Post</span>
                    </div>
                    <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <HiTrash className="w-5 h-5 mr-3 text-gray-600" />
                      <span>Delete Post</span>
                    </div>
                    <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <HiChartBar className="w-5 h-5 mr-3 text-gray-600" />
                      <span>Disable/Enable Comments</span>
                    </div>
                    <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <MdPushPin  className="w-5 h-5 mr-3 text-gray-600" />
                      <span>Pin/Unpin Post</span>
                    </div> 
                    <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <HiChartBar className="w-5 h-5 mr-3 text-gray-600" />
                      <span>View Post Analytics</span>
                    </div>
                </div>}
                {/* <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <HiShare className="w-5 h-5 mr-3 text-gray-600" />
                  <span>Share Post</span>
                </div> */}
                <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <HiBookmark className="w-5 h-5 mr-3 text-gray-600" />
                  <span>Save Post</span>
                </div>
                <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <HiFlag className="w-5 h-5 mr-3 text-gray-600" />
                  <span>Report Post</span>
                </div>
                <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <HiClock className="w-5 h-5 mr-3 text-gray-600" />
                  <span>View Post History</span>
                </div>
                <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <HiLink className="w-5 h-5 mr-3 text-gray-600" />
                  <span>Copy Post Link</span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default PostOptionsDropdown;
