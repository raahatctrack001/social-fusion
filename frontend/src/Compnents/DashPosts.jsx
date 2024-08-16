import React, { useEffect, useState } from 'react'
import ShowPosts from './ShowPosts'
import { useSelector } from 'react-redux';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useNavigate } from 'react-router-dom';

const DashPosts = () => {
    const [postData, setPostData] = useState(null);
    const { currentUser } = useSelector(state=>state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        (async()=>{
            try {
                const response = await fetch(apiEndPoints.getUserAddress(currentUser?._id));
                
                const data = await response.json();
                console.log("response", response);
                console.log("data", data);
                if(!response.ok){
                    throw new Error(response.message || "network response is not ok")
                }
                if(data.success){
                    setPostData(data?.data?.posts);
                }

            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
  return (
    <div>
        <ShowPosts heading={"My Posts"} postData={postData} />
    </div>
  )
}

export default DashPosts