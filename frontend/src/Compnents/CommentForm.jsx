import React from 'react'

const CommentForm = ({handlePostCommentSubmit, postCommentContent, setPostCommentContent}) => {
  return (
    <div>
        <form onSubmit={handlePostCommentSubmit} className="mb-4 ">
                <textarea
                    value={postCommentContent}
                    onChange={(e) => setPostCommentContent(e.target.value)}
                    placeholder="Write a comment about this post..."
                    className="border w-full p-2 rounded-xl"
                    rows={3}
                />
                <div className="flex justify-between ">
                    <div></div> 
                    <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md relative bottom-2">
                        Post Comment
                    </button>
                </div>
            </form>
    </div>
  )
}

export default CommentForm