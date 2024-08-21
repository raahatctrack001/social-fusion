import React, { useState } from 'react';
import { HiBan, HiBookmark, HiChartBar, HiChat, HiChatAlt, HiChatAlt2, HiClock, HiDotsVertical, HiExternalLink, HiFlag, HiLink, HiOutlineLink, HiPencil, HiShare, HiStar, HiThumbUp, HiTrash } from 'react-icons/hi';
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { Alert, Button, Modal } from 'flowbite-react';

function PostOptionsDropdown({enableComment, toggleComment, post, setPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector(state=>state.user)
  const [copyLink, setCopyLink] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

    const handleUpdatePostClick = ()=>{
      localStorage.setItem("postToUpdate", JSON.stringify(post))
      navigate(`/edit-post/${post?._id}`)
    }
    const handleDeletePostClick = async(e)=>{
      try {
        // console.log(apiEndPoints.deletePostAddress(post?._id))
        // return;
        const response = await fetch(apiEndPoints.deletePostAddress(post?._id), {
          method: "DELETE"
        })
        
        if(!response.ok){
          throw new Error(response.message||"Network response isn't ok!")
        }

        const data = await response.json();

        console.log("response", response);
        console.log("data", data);
        if(data.success){
          alert(data?.message);
          navigate(`/authors/author/${currentUser?._id}`)
        }
      } catch (error) {
        setError("failed to delete post, please try again later!")
      }
    }
    const handleCopyPostLinkClick = ()=>{
      navigator.clipboard.writeText(window.location.href)
      setCopyLink(true);

      setTimeout(() => {
        setCopyLink(false)
      }, 3000);
    }
    const handleEnablePostComment = async()=>{
      toggleComment();
      try {
        
        // console.log(apiEndPoints.toggleCommentSectionAddress(post?._id))
        const response = await fetch(`/api/v1/posts/toggle-comment-section/${post?._id}`, {method: "PATCH"})
        const data = await response.json()
        if(!response.ok){
          console.log("netowrk response is not ok")
        }
        if(data.success){
          setPost(data?.data)
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="relative inline-block text-left z-10">
  {/* post delete modal starts here*/}

    <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>
            <Alert color={"warning"}> Warning </Alert>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className='flex justify-between'>
            <Button color="failure" onClick={handleDeletePostClick}>
              Yes, Delete this Post
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

      {/* post delete modal ends here */}


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
                    <div 
                      onClick={()=>setShowModal(!showModal)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <HiTrash className="w-5 h-5 mr-3 text-gray-600" />
                      <span>Delete Post</span>
                    </div>
                    <div  
                      onClick={handleEnablePostComment}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      {post.enableComments ? 
                        <div className='flex justify-center items-center'>
                            <HiBan className="w-5 h-5 mr-3 text-gray-600" />
                            <span>Disable Comments</span>
                        </div> :
                        <div className='flex justify-center items-center'> 
                          <HiChatAlt2 className="w-5 h-5 mr-3 text-gray-600" />
                          <span>Enable Comments</span>
                        </div>}
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
                {currentUser?._id !== post?.author?._id && <div>
                  {/* <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <HiBookmark className="w-5 h-5 mr-3 text-gray-600" />
                    <span>Save Post</span>
                  </div> */}
                  <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <HiFlag className="w-5 h-5 mr-3 text-gray-600" />
                    <span>Report Post</span>
                  </div>
                </div> }
                {/* <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <HiClock className="w-5 h-5 mr-3 text-gray-600" />
                  <span>View Post History</span>
                </div> */}
                <div onClick={handleCopyPostLinkClick} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  {!copyLink ? <div className='flex items-center justify-center'><HiOutlineLink className="w-5 h-5 mr-3 text-gray-600" /> <span>Copy Link</span></div> :
                  <div className='flex items-center justify-center'> <HiExternalLink className="w-5 h-5 mr-3 text-gray-600" /> <span>Link Copied</span> </div>}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default PostOptionsDropdown;
