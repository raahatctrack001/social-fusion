import React, { useEffect, useState } from 'react'
import PostCard from '../Compnents/PostCard';
import { Button } from 'flowbite-react';
import { HiBadgeCheck, HiBookmark, HiBookmarkAlt, HiChat, HiCheckCircle, HiDotsVertical, HiHeart, HiOutlineBan, HiOutlineBookmark, HiOutlineChat, HiOutlineChatAlt, HiOutlineChatAlt2, HiOutlineHeart, HiOutlineShare, HiPlusCircle, HiShare, HiUser, HiUserAdd } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import NotFoundPage from './NotFoundPage';
import DisplayContent from '../Compnents/DisplayContent';
import { useDispatch, useSelector } from 'react-redux';
import PostOptionsDropdown from '../Compnents/PostOptionDropdown';
import { updateSuccess } from '../redux/slices/user.slice';
import SharePopup from '../Compnents/ShareURL';
import { formatDistanceToNow } from 'date-fns';
import PostComment from '../Compnents/PostComment';
import LikersPopup from '../Compnents/PostLikersPopup';

const PostPage = () => {
  const { currentUser } = useSelector(state=>state.user);
  
  const { postId } = useParams();
  
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();
  const [error, setError] = useState(null);
  const [enableComment, setEnableComment] = useState(false);
  const [likes, setLikes] = useState();
  const [showLikers, setShowLikers] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const postUrl = `${window.location.origin}/posts/post/${post?._id}`;

  const dispatch = useDispatch();
  
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); 


  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(apiEndPoints.getPostAddress(postId));
        const post = await response.json();

        if (post.success) {
          setPost(post.data);
          setAuthor(post.data.author);
          setLikes(post.data.likes.length); // Set likes count based on the fetched data
        }
      } catch (error) {
        console.log("error fetching post!", error);
        setError(error.message);
      }
    };

    fetchPostData();
  }, [postId]);
  
  if(!post)
    return <NotFoundPage />
  
  const calculateReadingTime = (content, wordsPerMinute = 250) => {
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    const readingTime = wordCount / wordsPerMinute;
    return Math.ceil(readingTime);
  };

  // const lastUpdatedAt = ()=>{
  //   const mongoDate = post?.updatedAt;
  //   const date = new Date(mongoDate);
  //   const formattedDate = date.toLocaleString('en-US', {
  //     weekday: 'long', // "Monday"
  //     year: 'numeric', // "2024"
  //     month: 'long', // "August"
  //     day: 'numeric', // "12"
  //     hour: 'numeric', // "8 AM"
  //     minute: 'numeric', // "00"
  //     second: 'numeric', // "00"
  //     timeZoneName: 'short' // "GMT"
  //   });
  //   return formattedDate
  // } 

  // console.log("post fetched", post)
  // // const { author } = post;

  const handleToggleFollowButtonClick = async (author)=>{
    try {
      fetch(apiEndPoints.toggleFollowUserAddress(author._id), {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((response)=>{
        console.log("resonse: ", response);
        return response.json();
      })
      .then((data)=>{
          // alert(data.message)
          // if(data.success){
          //   currentUser?.followers = data.followers;
          //   currentUser?.followings = data.followings;
          // }
          dispatch(updateSuccess(data?.data?.follower))
          console.log(data)
      })
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
  }

  const handleLikePostClick = async(e)=>{
      e.preventDefault();  
      try {
        const response = await fetch(apiEndPoints.likePostAddress(post?._id, currentUser?._id), {
          method: "POST",
        }) 
        if(!response.ok){
          throw new Error(response.message || "Network response is not ok")
        }

        const data = await response.json();
        if(data.success){
          console.log(data?.message)
          dispatch(updateSuccess(data?.data?.currentUser));
          setLikes(data?.data?.currentPost?.likes?.length)
          return;
        }

        setError(data.message)
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
  }
  // console.log("error: ", error)
  const handleSavePostClick = async(e)=>{
    e.preventDefault();  
    try {
      const response = await fetch(apiEndPoints.savePostAddress(post?._id, currentUser?._id), {
        method: "POST",
      }) 
      if(!response.ok){
        throw new Error(response.message || "Network response is not ok")
      }

      const data = await response.json();
      if(data.success){
        console.log("post saved", data)
        dispatch(updateSuccess(data?.data));
        // setLikes(data?.data?.currentPost?.likes?.length)
        return;
      }

      setError(data.message)
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

console.log(post)


  return (
    <div className='m-5 md:mx-16 lg:mx-28 xl:mx-52 '>
      <h1 className='font-bold text-xl md:text-3xl font-serif mb-3 border-b-2'> { post.title } </h1>
      
      <div>
        <div className=' flex  justify-between'>
          <div className='flex gap-2 items-center pb-2' onClick={()=>navigate(`/authors/author/${post?.author?._id}`)}>
            <img className='w-10 h-10 rounded-full' src={author?.profilePic} alt="" />
            <div className='flex w-full flex-col text-xs cursor-pointer'>
              <span className=''>{author?.username} </span>
              <span className=''>{author?.fullName} </span>
            </div>
          </div>
          <div className='flex gap-3 justify-center items-center'>
            {author?._id !== currentUser?._id ? 
                  (<Button 
                    onClick={()=>handleToggleFollowButtonClick(author)}
                    outline className='bg-gray-800 '> 
                                                {currentUser?.followings?.includes(author?._id) ? 
                                                ( <div className='flex gap-1 items-center relative'> <HiUser className='text-lg'/> <HiCheckCircle className='relative bottom-1 right-2 text-xs' />  Following</div> ) : 
                                                (<div className='flex items-center justify-center'> <HiUser className='text-lg mr-1' /> <HiPlusCircle className='text-xs relative right-2 bottom-1'/> <span className=''> Follow </span> </div>)}  
                  </Button>) : 
                                                
                  (<Button disabled className='h-10 w-20 flex justify-center items-center' color={"dark"}> <HiBadgeCheck /> </Button>)}
              <div className='p-2 cursor-pointer' > 
                      <PostOptionsDropdown                         
                        post={post}
                        setPost={setPost}
                        enableComment={enableComment} 
                        toggleComment={() => setEnableComment(!enableComment)}
                      /> 
              </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between border-b-2'>
          <p className=''> <span className='hidden md:inline'> Approx<span className='hidden lg:inline'>imate </span> time: </span> {calculateReadingTime(post?.content)} min read </p>
            <span className='hidden md:inline text-2xl lg:hidden'>|</span>
          <p className=''> <span className='hidden md:inline'> Published: </span> {formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}  </p>
        </div>
      </div>
      <div className='border-2 flex justify-center items-center text-xl py-3 font-semibold'>
        <div className='flex flex-col justify-center items-center gap-2'>
          {post.category}
          {/* <div> */}
            {/* {post?.thumbnail && <img src={post?.thumbnail?.at(-1)} alt="" />} */}
            {/* <p> original_filename </p> */}
          {/* </div> */}
        </div>
        {/* <img src={post?.imagesURLs[0]?.url} alt="" /> */}
        {/* <p className='w-full flex justify-center md:text-xl font-semibold my-3'> {post?.imagesURLs[0]?.original_filename} </p> */}
      </div>
      <div className='w-full flex justify-center items-center'>
        <DisplayContent content={post?.content} />

      </div>

        <div className='flex justify-between border-2 p-2 rounded-lg'>          
          <div className='flex justify-center items-center gap-3'>

                {showLikers[post?._id] && <LikersPopup postId={post?._id} isHovered={showLikers} setIsHovered={setShowLikers} />}
              <div onClick={handleLikePostClick}> 
                {currentUser?.likedPosts?.includes(post?._id) ? 
                <div className='flex justify-center items-center gap-1'> <HiHeart className='text-white-500 cursor-pointer text-red-700 hover:text-gray-800 hover:text-lg'/><span className='hover:text-xl cursor-pointer' onClick={()=>setShowLikers({[post?._id]: true})} >  {likes||0}</span> </div>: 
                <div className='flex justify-center items-center gap-1'> <HiOutlineHeart className='text-white-500 cursor-pointer hover:text-gray-800 hover:text-lg' /> <span className='hover:text-xl cursor-pointer' onClick={()=>setShowLikers({[post?._id]: true})} > {likes||0} </span></div>}
              </div>
              
            
              {post?.enableComments ?
                <div >

                  <HiOutlineChatAlt2 className='text-white-500 cursor-pointer hover:text-gray-800 hover:text-lg'/> 
                                  
                </div> :    
              
              <Button disabled className='h-10'> <HiOutlineBan /> </Button>} 
                
              <HiOutlineShare onClick={()=>setShowPopup(true)}  className='text-white-500 cursor-pointer hover:text-gray-800 hover:text-lg'/>
              {showPopup && (
                <div className='w-full'>
                  <SharePopup postUrl={postUrl} onClose={() => setShowPopup(false)} />
                </div>

              )}
          </div> 
          { currentUser?._id !== post?.author?._id && 
          <div onClick={handleSavePostClick}>
            {currentUser?.savedPosts?.includes(post?._id) ? <HiBookmark className='text-black-500 text-red-800 cursor-pointer hover:text-gray-800 hover:text-lg'/> : <HiOutlineBookmark className='text-black-500 cursor-pointer hover:text-gray-800 hover:text-lg'/>}
          </div>}
        </div>
        
         <PostComment post = { post }/>
        
    </div>
  )
}


export default PostPage
