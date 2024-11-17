import { useEffect, useState } from "react";
import { apiEndPoints } from "../../apiEndPoints/api.addresses";
import { useNavigate } from "react-router-dom";
import DisplayContent from "../DisplayContent";

export default function PostInMessageBox({ postLink }) {
    const postId = postLink.split("/").at(-1);
    const [post, setPost] = useState();
    const navigate = useNavigate();
    console.log(postLink)
    useEffect(()=>{
        (async ()=>{
            try {
                const response = await fetch(apiEndPoints.getPostAddress(postId));
                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "network response is not ok while fetching post from postId")
                }

                if(data.success){
                    console.log("data from message box for post", data)
                    setPost(data.data);
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [postLink])

    if(!post){
        return <div className="message-box bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md max-w-md mx-auto flex items-center">
           <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 mr-3 animate-spin"></div>
             <span className="loading-text text-gray-700 dark:text-gray-400">
                Loading post...
            </span>
        </div>     
    }
    return (
        <div
        onClick={(e) => {
            window.open(`/posts/post/${postId}`, '_blank', 'noopener,noreferrer'),
            e.stopPropagation();
        }}
        className="message-box cursor-pointer flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-lg max-w-md mx-auto transition-transform transform hover:scale-105">
        
        <div class="flex items-center gap-3 mb-3">
            <img
                className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600" 
                src={post?.author?.profilePic.at(-1) || "placeholder-image-url"} 
                alt="author's pic" 
            />
            
            <div class="flex flex-col">
                <a href={postLink} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 dark:text-blue-400 font-medium hover:underline truncate">
                   {postLink.length > 40 ? postLink.substr(0, 40) + "..." : postLink}
                </a>
                <span class="text-xs text-gray-500 dark:text-gray-400">Shared a post</span>
            </div>
        </div>
    
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2 line-clamp-1 truncate">
            {post.title.length > 30 ? post.title.substring(0, 30) + "..." : post.title}
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3 truncate">

            <DisplayContent content = {post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content} />
        </p>
    </div>
    
    );
  }
  