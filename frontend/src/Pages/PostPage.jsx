import React, { useEffect } from 'react'
import PostCard from '../Compnents/PostCard';

const PostPage = () => {
  const postData = JSON.parse(localStorage.getItem("postToDisplay"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <PostCard post = {postData} />
  )
}

export default PostPage