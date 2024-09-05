// console.log("comment", comment);
//     const { currentUser } = useSelector(state => state.user);
//     const [newComment, setNewComment] = useState(comment);
//     const [showCommentReply, setShowCommentReply] = useState(comment?.replies||{});
//     const [commentReplies, setCommentReplies] = useState(comment?.replies||{});
//     const [replyContent, setReplyContent] = useState('');
//     const [showReplyBox, setShowReplyBox] = useState(false);
//     const [showEditCommentPopup, setShowEditCommentPopup] = useState(false);
//     const [editContent, setEditContent] = useState('')
//     const [error, setError] = useState('');
//     const [showPopup, setShowPopup] = useState(false);

//     const dispatch = useDispatch();




//     if(!post?.enableComments){
//         return <CommentsDisabled />
//     }
//     console.log("post", post);
    

//     const [postCommentContent, setPostCommentContent] = useState('');
//     const [render, setRender] = useState(true);
//     // const [replyContent, setReplyContent] = useState("");
//     // const [showReplyBox, setShowReplyBox] = useState({});
//     const [localComments, setLocalComments] = useState(post?.comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []);
//     // const [commentReplies, setCommentReplies] = useState({});
//     // const [showPopup, setShowPopup] = useState(false)






// const handlePostCommentSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const formData = new FormData();
//         formData.append("content", postCommentContent);
//         const response = await fetch(apiEndPoints.createCommentAddress(post?._id, currentUser?._id), {
//             method: "POST",
//             body: formData,
//         });
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || "Network response is not ok!");
//         }
//         if (data.success) {
//             console.log("added comment response", data);
//             setLocalComments(data?.data?.currentPost?.comments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []);

//             dispatch(updateSuccess(data?.data?.currentUser));
//             setPostCommentContent('');
//             return;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };


// const handleLikeCommentClick = async (commentId, userId) => {
//     try {
//         const response = await fetch(apiEndPoints.likeCommentAddress(commentId, userId), {
//             method: "POST",
//         });
//         if (!response.ok) {
//             throw new Error(response.message || "Network response is not ok!");
//         }

//         const data = await response.json();
//         if (data.success) {
//             setLocalComments(prevComments =>
//                 prevComments.map(comment =>
//                     comment._id === commentId
//                         ? data?.data?.comment
//                         : comment
//                 )
//             );

//             dispatch(updateSuccess(data?.data?.currentUser));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// const handleReportClick = ()=>{
//     alert("feature is under development yet!")
// }
// const handleEditClick = ()=>{
//     alert("feature is under development yet!")
// }
// const handleDeleteClick = async (comment)=>{
//     try {
//         const response = await fetch(apiEndPoints.deleteCommentAddress(comment?._id), {
//             method: "DELETE"
//         });

//         const data = await response.json();
//         if(!response.ok){
//             console.log(data.message||"Network response is not ok!")
//         }
//         if(data.success){
//             console.log(data);
//             // window.location.reload();
//             // alert(data.message + " if it still appears, don't worry we will update shortly or refresh the page!")
//             const updatedComment = localComments.filter(reply => reply._id != data?.data?._id);
//             setLocalComments(updatedComment);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }




// const handleClosePopup = () => { //under development
//     setShowPopup(false);
//   };

// const handleShowReply = async()=>{
//     setShowReplyBox(!showReplyBox);
//     handleReplyClick();
// }

// const handleReplyClick = async () => {
//     console.log("reply of comment", comment);
//     try {
//         const response = await fetch(apiEndPoints.getCommentAddress(comment?._id));
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || "Network response is not ok!");
//         }
//         console.log(data);

//         // Sort the replies by createdAt in descending order
//         const sortedReplies = (data?.data || []).filter(reply => !isNaN(new Date(reply.createdAt).getTime()))
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         // Update both states with sorted replies
//         setShowCommentReply(prev => ({
//             ...prev,
//             [comment?._id]: sortedReplies
//         }));
        
//         setCommentReplies(prevReplies => ({
//             ...prevReplies,
//             [comment._id]: sortedReplies
//         }));
//     } catch (error) {
//         console.log(error);
//     }
// };

// const handleReplySubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const formData = new FormData();
//         formData.append("content", replyContent);
//         const response = await fetch(apiEndPoints.replyCommentAddress(comment?._id, currentUser?._id), {
//             method: "POST",
//             body: formData,
//         });
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || "Network response is not ok!");
//         }
//         if (data.success) {
//             console.log("reply comment data", data);

//             // Sort the new list of replies by createdAt
//             const newReply = data?.data?.newComment;
//             const updatedReplies = [newReply, ...(commentReplies[comment._id] || [])]
//                 .filter(reply => !isNaN(new Date(reply?.createdAt).getTime()))
//                 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//             // Update both states with the new sorted replies
//             setCommentReplies(prevReplies => ({
//                 ...prevReplies,
//                 [comment._id]: updatedReplies
//             }));

//             setShowCommentReply(prev => ({
//                 ...prev,
//                 [comment._id]: updatedReplies
//             }));

//             setReplyContent('');
//             dispatch(updateSuccess(data?.data?.currentUser));
//             handleReplyClick();
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// const handleDeleteReplyClick = async (comment)=>{
//     try {
//         const response = await fetch(apiEndPoints.deleteCommentAddress(comment?._id), {
//             method: "DELETE"
//         });

//         const data = await response.json();
//         if(!response.ok){
//             console.log(data.message||"Network response is not ok!")
//         }
//         if(data.success){
            
//             handleReplyClick();
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// const handleEditClick = ()=>{
//     setError('')
//     setShowEditCommentPopup(!showEditCommentPopup)
// }

// const handleEditCommentClick = async ()=>{
//     try {
//         setError('')
//         const formData = new FormData();
//         formData.append("editedContent", editContent);
//         const response = await fetch(apiEndPoints.updateCommentsAddress(comment?._id), {method: "PATCH", body: formData})
//         const data = await response.json()
//         if(!response.ok){
//             throw new Error(data?.message || "Network response isn't ok! in handleEdit comment click")
//         }

//         if(data?.success){
//             console.log(data);
//             setNewComment(data?.data)
//             console.log(data);
//             setShowEditCommentPopup(!showEditCommentPopup)
//         }
//     } catch (error) {
//         console.log(error)
//         setError(error.message);
//     }
// }

// const handleReplyLikeCommentClick = async (commentId, userId) => {
//     try {
//         const response = await fetch(apiEndPoints.likeCommentAddress(commentId, userId), {
//             method: "POST",
//         });
//         if (!response.ok) {
//             throw new Error(response.message || "Network response is not ok!");
//         }

//         const data = await response.json();
//         if (data.success) {
//             handleReplyClick();
//             dispatch(updateSuccess(data?.data?.currentUser));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };