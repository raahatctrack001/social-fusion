import React, { useEffect, useState } from 'react';
import { Sidebar, Navbar, Dropdown, Button, Table, Modal, Alert } from 'flowbite-react';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useSelector } from 'react-redux';
import DisplayContent from '../Compnents/DisplayContent';
import RecentPostsTable from '../Compnents/RecentPostTable';
import DashSidebar from '../Compnents/DashSidebar';
import { useNavigate } from 'react-router-dom';
import PageLoader from './PageLoader';
import DashHomePosts from './Posts/DashboardPosts';
import CustomDropdown from './CustomDropdown';
// import { join } from 'path';

const DashHome = () => {
    const { currentUser } = useSelector(state=>state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [postData, setPostData] = useState([]);
    const [postsLastWeek, setPostsLastWeek] = useState([]);
    const [postsLastTwoWeeks, setPostsLastTwoWeeks] = useState([]);
    const [postsLastMonth, setPostsLastMonth] = useState([]);
    const [postsLastThreeMonths, setPostsLastThreeMonths] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [postToDisplay, setPostToDisplay] = useState([]);

  
    useEffect(()=>{
        fetch(apiEndPoints.allPostAnalytics(currentUser?._id, currentPage))
          .then((posts)=>{
            if(!posts){
              throw new Error("network response wasn't ok for dashboard!");
            }
            // console.log(posts)
            return posts.json()
          })
          .then((data)=>{
            console.log("data", data)
            setPostData(data.data.allPosts)
            setPostsLastWeek(data.data.postsLastWeek)
            setPostsLastTwoWeeks(data.data.postsLastTwoWeeks)
            setPostsLastMonth(data.data.postsLastMonth)
            setPostsLastThreeMonths(data.data.postsLastThreeMonths)
            setPostToDisplay(data.data.allPosts)
          })
          .catch((err)=>{
            console.log(err)
          })
        }, [currentPage])


    useEffect(()=>{
        let posts = [];
        if(selectedOption === dropDownOptions[0]){
          posts = postData
        }
        else if(selectedOption === dropDownOptions[1]){
          posts = postsLastWeek
        }
        else if(selectedOption === dropDownOptions[2]){
          posts = postsLastTwoWeeks
        }
        else if(selectedOption === dropDownOptions[3]){
          posts = postsLastMonth
        }
        else if(selectedOption === dropDownOptions[4]){
          posts = postsLastThreeMonths
        }
  
        setPostToDisplay(posts);     
        }, [selectedOption])      
   console.log("postdata to send", postToDisplay);

  const dropDownOptions = ["All Posts", "Last Week", "Last 15 days", "Last Month", "Last Three Months"];
  const handleOptionSelect = (value)=>{
    console.log("post before", value);
    setSelectedOption(value)
  }  
  return (
    <div className="flex min-h-screen dark:bg-[rgb(16,23,42)] pl-10">
      
      

        {/* delete modal ends here */}


      {/* Main Content */}
      <div className="flex-1 flex flex-col">


        {/* Content Area */}
        <main className="p-6">
          {/* <h2 className="text-2xl font-semibold mb-4">Dashboard Overview 
            <Ale?rt color={'warning'} className='font-bold text-xl md:hidden fixed top-16 z-10 w-full flex justify-center items-center'> consider larger screen for dashboard analysis </Ale?rt>
          </h2> */}

          {/* Key Metrics */}
          <div className="flex flex-col gap-4 mb-8">
            {/* <div className=" rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Recent Posts</h3>
              <RecentPostsTable heading={"Recent Posts"} displayPosts={recentPosts} />
            </div> */}
            {/* <div className='flex justify-between '> */}
              {/* <div className=" p-6 rounded-lg shadow-md order-2 w-1/4 border-2">
                <h1 className="text-lg font-semibold mb-2">Traffic Stats:</h1>
                <ul className=''> 
                  <h1>Posts added in</h1> 
                  <li>last week : {postsLastWeek?.length}</li>
                  <li>last 15 days : {postsLastTwoWeeks?.length||0}</li>
                  <li>last one month : {postsLastMonth?.length||0}</li>
                  <li>last three months Posts: {postsLastThreeMonths?.length||0}</li>
                  <h2> Daily Visitors: 1200</h2>              
                </ul>
              </div> */}
              {/* <div className="p-6 rounded-lg shadow-md w-3/4">
                <RecentPostsTable heading={"Popular Posts"} displayPosts={popularPosts} />
            </div>
            </div>   */}
          </div>

          {/* Post Management Table */}
          <div className='flex justify-between'>
            <h2 className="text-2xl font-semibold mb-4 ">Manage Posts</h2>
            <div className='w-full max-w-sm'>
              <CustomDropdown defaultValue={dropDownOptions[0]} options={dropDownOptions} onSelect={handleOptionSelect}/>
            </div>
          </div>
          <DashHomePosts posts={postToDisplay} />

        </main>
      </div>
    </div>
  );
};

export default DashHome;
