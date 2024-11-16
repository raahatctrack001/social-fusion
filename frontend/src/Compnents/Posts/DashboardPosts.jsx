import { Alert, Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { apiEndPoints } from "../../apiEndPoints/api.addresses";
import { useSelector } from "react-redux";
import PageLoader from "../PageLoader";

export default function DashHomePosts({posts, setPosts}){
    const [postData, setPostData] = useState(posts);
    const navigate = useNavigate();
    const [postToDelete, setPostToDelete] = useState(null);
  
    const { currentUser } = useSelector(state=>state.user)
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setPostData(posts);
    }, [posts])

    const handleDeletePostClick = async()=>{
        console.log("we are in right place to delete post section!")
        setLoading(true);
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
            console.log(data)
            // alert(data?.message);
            setPostData(prevData=>prevData.filter(post=>post?._id != data.data?._id));
            setShowModal(false);
            // window.location.reload();
            // navigate(`/authors/author/${currentUser?._id}`)
          }
        } catch (error) {
          setError("failed to delete post, please try again later!")
          console.log(error)
        }
        finally{
          setLoading(false);
        }
      }

      const handleUpdatePostClick = (post)=>{
        localStorage.setItem("postToUpdate", JSON.stringify(post))
        navigate(`/edit-post/${post?._id}`)
      }
      const handleDeletePost = (post)=>{
        setShowModal(!showModal);
        setPostToDelete(post);
        handleDeletePostClick();
      }

      const handleHideUnhidePost = async (postId)=>{
        try {
          setLoading(true)
          const response = await fetch(apiEndPoints.hideUnhidePost(postId), {
            method: "PATCH"
          })
      
          const data = await response.json();
          if(!response.ok){
            console.log(data.success || "error while fetching network response")
          }
      
          if(data.success){
            window.location.reload();
          }
        } catch (error) {
          console.log(error)
        }
        finally{
          setLoading(false);
        }
          
      }

      console.log(postData);
      if(loading){
        return <PageLoader info={"Updating Dashboard"} />
      }
      if(postData.length == 0){
        return <div className="w-full min-h-screen flex justify-center items-center">
            <h1> No Post for this choice. Please change option from dropdown to manage available posts</h1>
        </div>
      }
    return <div className='border-2 rounded-lg p-2'>

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

    <Table className=''>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>isHidden</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body >
          {postData?.length > 0 && postData.map((post, index) => (
            currentUser?._id === post?.author?._id && <Table.Row key={index} className=''>
              <Table.Cell><div className='cursor-pointer text-blue-600' onClick={()=>navigate(`/posts/post/${post?._id}`)}>{post?.title}</div></Table.Cell>
              <Table.Cell> 
                <Button 
                    onClick={()=>handleHideUnhidePost(post?._id)}
                    outline={!post?.isHidden}
                    color={'success'} 
                    className="h-5 flex justify-center items-center"> 
                        {post?.isHidden ? "UNHIDE" : "HIDE"} 
                </Button> 
              </Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
              <Table.Cell>Published</Table.Cell>
              <Table.Cell>
                <div className='flex gap-1'>
                  <Button onClick={()=>handleUpdatePostClick(post)} color={'warning'} size="xs">Edit</Button>
                  <Button onClick={()=>handleDeletePost(post)} color={'failure'} size="xs">Delete</Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
    </Table>
  </div>
}