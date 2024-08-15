import React, { useEffect, useState } from 'react';
import { Sidebar, Navbar, Dropdown, Button, Table } from 'flowbite-react';
import { HiBookmark, HiChartBar, HiCog, HiHome, HiPencil, HiSave, HiSaveAs, HiUser } from 'react-icons/hi';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useSelector } from 'react-redux';
import DisplayContent from '../Compnents/DisplayContent';
import RecentPostsTable from '../Compnents/RecentPostTable';
// import { join } from 'path';

const Dashboard = () => {
    const { currentUser } = useSelector(state=>state.user)
    const [postData, setPostData] = useState(null);
    const [postsLastWeek, setPostsLastWeek] = useState(null);
    const [postsLastTwoWeeks, setPostsLastTwoWeeks] = useState(null);
    const [postsLastMonth, setPostsLastMonth] = useState(null);
    const [postsLastThreeMonths, setPostsLastThreeMonths] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const [popularPosts, setPopularPosts] = useState(null);
    // const [olderPosts, setOlderPosts] = useState(null)
    // useEffect(()=>{
    //   fetch(apiEndPoints.getPostsAddress())
    //     .then((posts)=>{
    //       if(!posts){
    //         throw new Error("network response wasn't ok for dashboard!");
    //       }
    //       return posts.json()
    //     })
    //     .then((data)=>{
    //       const fetchedData = data.data;
    //       console.log("fetched post for dashboard!"); 
    //       setPostData(fetchedData)
    //     })
    //     .catch((err)=>{
    //       throw new Error("Error fetching posts", err);
    //     })
    // }, [])
    // console.log(apiEndPoints.allPostAnalytics())
    useEffect(()=>{
        fetch(apiEndPoints.allPostAnalytics())
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
            setRecentPosts(data.data.allPosts?.slice(0, 5))
            setPopularPosts(data.data.allPosts?.slice(10, 17))
          })
          .catch((err)=>{
            console.log(err)
          })
        }, [])
    console.log("sliced data", postData?.slice(0, 10));
    console.log("recents posts", recentPosts);
    console.log("popular posts", popularPosts);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiHome}>
              Home
            </Sidebar.Item>
            <Sidebar.Item href="/posts" icon={HiPencil}>
              Posts
            </Sidebar.Item>
            <Sidebar.Item href="/saved-posts" icon={HiSave}>
              Saved Posts
            </Sidebar.Item>
            <Sidebar.Item href="/categories" icon={HiUser}>
              Categories
            </Sidebar.Item>
            <Sidebar.Item href="/comments" icon={HiUser}>
              Comments
            </Sidebar.Item>
            <Sidebar.Item href="/users" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="/analytics" icon={HiChartBar}>
              Analytics
            </Sidebar.Item>
            <Sidebar.Item href="/settings" icon={HiCog}>
              Settings
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <Navbar className="bg-white shadow-md">
          <Navbar.Brand href="/">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Dashboard
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown inline label="Profile">
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar>

        {/* Content Area */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>

          {/* Key Metrics */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md">
            {/* <h3 className="text-lg font-semibold mb-2">Recent Posts</h3> */}
              <RecentPostsTable heading={"Recent Posts"} displayPosts={recentPosts} />
            </div>
            <div className='flex justify-between'>
              <div className="bg-white p-6 rounded-lg shadow-md order-2 w-1/4">
                <h1 className="text-lg font-semibold mb-2">Traffic Stats:</h1>
                <h2> Posts added in </h2>
                <p>1. last week : {postsLastWeek?.length}</p>
                <p>2. last 15 days : {postsLastTwoWeeks?.length||0}</p>
                <p>3. last one month : {postsLastMonth?.length||0}</p>
                <p>4. last three Posts: {postsLastThreeMonths?.length||0}</p>
                <h2> Daily Visitors: 1200</h2>              
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md w-3/4">
                <RecentPostsTable heading={"Popular Posts"} displayPosts={popularPosts} />
            </div>
            </div>  
          </div>

          {/* Post Management Table */}
          <h2 className="text-2xl font-semibold mb-4">Manage Posts</h2>
        <Table>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Author</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {postData?.length > 0 && postData.map((post, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{post?.title}</Table.Cell>
                  <Table.Cell>{ currentUser._id === post?.author?._id ? "Author" :  post?.author?.fullName}</Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>Published</Table.Cell>
                  <Table.Cell>
                    {currentUser?._id === post?.author?._id ? <div className='flex gap-1'>
                      <Button color={'warning'} size="xs">Edit</Button>
                      <Button color={'failure'} size="xs">Delete</Button>
                    </div> : <Button disabled color={'failure'}> N/A </Button>}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
        </Table>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
