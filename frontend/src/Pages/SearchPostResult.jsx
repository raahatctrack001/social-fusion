import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import PostCard from '../Compnents/PostCard'
import NotFoundPage from './NotFoundPage'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { apiEndPoints } from '../apiEndPoints/api.addresses'
import ShowPosts from '../Compnents/ShowPosts'

const SearchPostResult = () => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);
    
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    
    // console.log(query)
    useEffect(()=>{
        try {
            if(!query){
              navigate('/')
            }
            fetch(apiEndPoints.searchPostsAddress(query), {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then((response)=>{
                    console.log("response", response)
                    // if(!response.ok){
                    //     alert(response.message);
                    // }
                    return response.json();
                })
                .then((data)=>{
                    
                    setPostData(data.posts);
            
                    
                })
        } catch (error) {   
            console.log(error);
        }
    }, [query])

    // console.log("inside searchedPostResult page, ", postData)
    // console.log("query", query)

  return (
    <div className='flex flex-nowrap gap-4 flex-col md:flex-row mx-2 px-4 white justify-center'>
        <ShowPosts heading={"Search Result"} postData={postData} />
    </div>
  )
}

export default SearchPostResult