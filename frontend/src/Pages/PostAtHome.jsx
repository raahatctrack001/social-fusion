import { apiEndPoints } from '../apiEndPoints/api.addresses'
import ShowPosts from '../Compnents/ShowPosts'
import PageLoader from '../Compnents/PageLoader'
import { useEffect, useState } from 'react'
import CategorisedPost from '../Compnents/CategorisedPost';
import CustomDropdown from '../Compnents/CustomDropdown';
import NotFoundPage from './NotFoundPage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
        className='p-2 px-4 rounded-lg font-semibold'>
        Add Categories
      </button>
    </div>
  }
  if(postData.length === 0)
    return <PageLoader />

return (
<div className='flex flex-col flex-1'>
    <div className='overflow-y-scroll' style={{ height: '53rem' }} onScroll={handlePostScroll}>  
      {postData.length > 0 && 
        <ShowPosts heading={`Suggested posts`} postData={postData} /> }
    </div>
</div>)
}