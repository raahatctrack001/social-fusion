import React, { useEffect, useState } from 'react';
import { Sidebar, Navbar, Dropdown, Button, Table, Modal, Alert } from 'flowbite-react';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useSelector } from 'react-redux';
import DisplayContent from '../Compnents/DisplayContent';
import RecentPostsTable from '../Compnents/RecentPostTable';
import DashSidebar from '../Compnents/DashSidebar';
import { useNavigate } from 'react-router-dom';
// import { join } from 'path';

const DashHome = () => {
    const { currentUser } = useSelector(state=>state.user)
    const [postData, setPostData] = useState(null);
    const [postsLastWeek, setPostsLastWeek] = useState(null);
    const [postsLastTwoWeeks, setPostsLastTwoWeeks] = useState(null);
    const [postsLastMonth, setPostsLastMonth] = useState(null);
    const [postsLastThreeMonths, setPostsLastThreeMonths] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const [popularPosts, setPopularPosts] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [postToDelete, setPostToDelete] = useState(null);
    const navigate = useNavigate();
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

    const handleUpdatePostClick = (post)=>{
        localStorage.setItem("postToUpdate", JSON.stringify(post))
        navigate(`/edit-post/${post?._id}`)
      }
      const handleDeletePost = (post)=>{
        setShowModal(!showModal);
        setPostToDelete(post);
        handleDeletePostClick();
      }
      const handleDeletePostClick = async()=>{
        console.log("we are in right place to delete post section!")
        try {
          // console.log(apiEndPoints.deletePostAddress(post?._id))
          // return;
          const response = await fetch(apiEndPoints.deletePostAddress(postToDelete?._id), {
            method: "DELETE"
          })
          
          if(!response.ok){
            throw new Error(response.message||"Network response isn't ok!")
          }
    
          const data = await response.json();
    
          console.log("response", response);
          console.log("data", data);
          if(data.success){
            alert(data?.message);
            window.location.reload();
            // navigate(`/authors/author/${currentUser?._id}`)
          }
        } catch (error) {
          setError("failed to delete post, please try again later!")
          console.log(error)
        }
      }
    // console.log("sliced data", postData?.slice(0, 10));
    // console.log("recents posts", recentPosts);
    // console.log("popular posts", popularPosts);
  return (
    <div className="flex min-h-screen dark:bg-[rgb(16,23,42)]">
      
      {/* delete modal starts here */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>
            <Alert color={"warning"}> Warning </Alert>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className='flex justify-between'>
            <Button color="failure" onClick={handleDeletePostClick}>
              Yes, Delete this post.
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* delete modal ends here */}


      {/* Main Content */}
      <div className="flex-1 flex flex-col">


        {/* Content Area */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>

          {/* Key Metrics */}
          <div className="flex flex-col gap-4 mb-8">
            <div className=" rounded-lg shadow-md">
            {/* <h3 className="text-lg font-semibold mb-2">Recent Posts</h3> */}
              <RecentPostsTable heading={"Recent Posts"} displayPosts={recentPosts} />
            </div>
            <div className='flex justify-between'>
              <div className=" p-6 rounded-lg shadow-md order-2 w-1/4">
                <h1 className="text-lg font-semibold mb-2">Traffic Stats:</h1>
                <ul> 
                  <h1>Posts added in</h1> 
                  <li>last week : {postsLastWeek?.length}</li>
                  <li>last 15 days : {postsLastTwoWeeks?.length||0}</li>
                  <li>last one month : {postsLastMonth?.length||0}</li>
                  <li>last three months Posts: {postsLastThreeMonths?.length||0}</li>
                  <h2> Daily Visitors: 1200</h2>              
                </ul>
              </div>
              <div className="p-6 rounded-lg shadow-md w-3/4">
                <RecentPostsTable heading={"Popular Posts"} displayPosts={popularPosts} />
            </div>
            </div>  
          </div>

          {/* Post Management Table */}
          <h2 className="text-2xl font-semibold mb-4 ">Manage Posts</h2>
          <div className='border-2 rounded-lg p-2'>
            <Table className=''>
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
                      <Table.Cell><div className='text-blue-600' onClick={()=>navigate(`/posts/post/${post?._id}`)}>{post?.title}</div></Table.Cell>
                      <Table.Cell > {post?.author ? <div className='text-blue-600' onClick={()=>navigate(`/authors/author/${post?.author?._id}`)}>{ currentUser._id === post?.author?._id ? "Author" :  post?.author?.fullName} </div> : <div> Blog User </div>}</Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>Published</Table.Cell>
                      <Table.Cell>
                        {currentUser?._id === post?.author?._id ? <div className='flex gap-1'>
                          <Button onClick={()=>handleUpdatePostClick(post)} color={'warning'} size="xs">Edit</Button>
                          <Button onClick={()=>handleDeletePost(post)} color={'failure'} size="xs">Delete</Button>
                        </div> : <Button disabled color={'failure'}> N/A </Button>}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
            </Table>
          </div>

        </main>
      </div>
    </div>
  );
};

export default DashHome;
