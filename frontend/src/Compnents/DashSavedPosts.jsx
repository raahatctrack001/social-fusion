import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import ShowPosts from './ShowPosts';

const DashSavedPosts = () => {
  const { currentUser } = useSelector(state=>state.user);
  const [posts, setPosts] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(apiEndPoints.getSavedPostAddress(currentUser?._id));
        const post = await response.json();
        //console.log("response", response);
        //console.log("data", post);
        if (post.success) {
          setPosts(post.data);
          setAuthor(post.data.author);
          // setLikes(post.data.likes.length); // Set likes count based on the fetched data
        }
      } catch (error) {
        //console.log("error fetching post!", error);
        setError(error.message);
      }
    };

    fetchPostData();
  }, []);

  return (
    <div>
      <ShowPosts heading={"Saved Posts"} postData={posts} />

    </div>
  )
}

export default DashSavedPosts