import React, { useEffect, useState } from 'react'
import ShowPosts from './ShowPosts'
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useSelector } from 'react-redux';

const HiddenPosts = () => {
    const { currentUser } = useSelector(state=>state.user);
    const [posts, setPosts] = useState([]);

  useEffect(()=>{
    (async ()=>{
        const response = await fetch(apiEndPoints.getHiddenPosts(currentUser?._id), {method: "GET"});
        const data = await response.json();
        console.log("hidden post is a hit now.")
        if(!response.ok){
            console.log(data.message || "error network response")
        }

        if(data.success){
            setPosts(data.data);
        }
    })()
  }, [])
  return (
    <ShowPosts heading={"Hidden Posts"} postData={posts} />
  )
}

export default HiddenPosts