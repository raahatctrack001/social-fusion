import { apiEndPoints } from '../apiEndPoints/api.addresses'
import ShowPosts from '../Compnents/ShowPosts'
import PageLoader from '../Compnents/PageLoader'
import { useEffect, useState } from 'react'
import CategorisedPost from '../Compnents/CategorisedPost';
import CustomDropdown from '../Compnents/CustomDropdown';
import NotFoundPage from './NotFoundPage';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PostCategoryDropdown from '../Compnents/PostCategoryDropdown';
import { Button } from 'flowbite-react';

export default function PostAtHome(){
    const { currentUser } = useSelector(state=>state.user);
    const [postData, setPostData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPost, setTotalPost] = useState(0);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
  //     Fetch posts on page load and whenever the currentPage changes

//   const categories = [
//     "Technology",
//     "Health & Wellness",
//     "Business & Finance",
//     "Education",
//     "Entertainment",
//     "Lifestyle",
//     "Travel",
//     "Food & Drink",
//     "Fashion",
//     "Sports",
//     "Art & Design",
//     "Science",
//     "DIY & Crafts",
//     "Personal Development",
//     "Uncategorised",
//     "All Category",
//   ];

  
//   const handleCategorySelect = (value) => {
//     console.log("values selected at home category", value);
//     setCategory(value);
//     if (value === "All Category") setCategory("");
//   };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const response = await fetch(apiEndPoints.getHomePostSuggestion(currentUser?._id, currentPage));
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message || "Failed to fetch posts");
        console.log("data", data);
        // return;
        setPostData(prevData => [...prevData, ...data.data?.posts]);
        setTotalPost(Math.floor(data.data?.totalCount / 9 + 1));
      } catch (err) {
        console.error("Error fetching posts", err);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  
  // Scroll event handler for posts
  const handlePostScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoadingPosts && currentPage < totalPost) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  const sendToSelectCategory = ()=>{
    localStorage.setItem("askPreferredCategory", true);
    navigate('/select-preference')
  }
  if(postData.length === 0 && currentUser.preferredCategory?.length === 0){
    return <div className='w-full flex flex-col gap-5 justify-center items-center'>
      <h1 className='bg-gray-600 px-5 rounded-lg font-semibold text-xl'> 
        Please follow someone who has posts or show some interest in category to get suggested posts
      </h1>
      <button
        onClick={sendToSelectCategory} 
        className='p-2 px-4 rounded-lg font-semibold bg-gray-400 text-black'>
        Add Categories
      </button>
    </div>
  }
  if(postData.length === 0)
    return <PageLoader />

return (
<div className='flex flex-col flex-1'>
    {/* <div className='px-10 relative top-10'>
      <PostCategoryDropdown />
    </div> */}
    {/* <div>
      <CategorisedPost />
    </div> */}
    <div className='overflow-y-scroll' style={{ height: '53rem' }} onScroll={handlePostScroll}> 
    <div className='w-full flex flex-col gap-2 justify-center items-center mt-5 mr-3'>
    {/* <Link to="/create-post" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      <span className="w-fullName h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
          <span className="relative text-white">Create Blog</span>
      </span>
    </Link> */}
      <h2 className='text-xl font-bold '> Start your journey... </h2>
      <Button 
        onClick={()=>navigate("/create-post")} 
        className='w-full max-w-7xl bg-purple-400 font-bold mr-3' outline > 
          Create Blog 
      </Button>
    </div>
      {postData.length > 0 && 
        <ShowPosts heading={`Suggested posts`} postData={postData} /> }
    </div>
</div>)
}