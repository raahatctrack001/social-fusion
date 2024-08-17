
export  const apiEndPoints = {
    registerAddress : () => `/api/v1/auth/register`,
    loginAddress : ()=> `/api/v1/auth/login`,
    logoutAddress : ()=> `/api/v1/auth/logout`,
    updatePasswordAddress: (authorId)=>`/api/v1/auth/update-password//${authorId}`,

    getUserAddress : (userId)=> `/api/v1/users/get-user/${userId}`,
    getUsersAddress : ()=> `/api/v1/users/get-users/`,
    deleteUserAddress : (userId)=> `/api/v1/users/delete-user/${userId}`,
    updateUserAddress : (userId)=> `/api/v1/users/update-user/${userId}`,
    updateProfilePic : (userId)=> `/api/v1/users/upload-profile-picture/${userId}`,
    toggleFollowUserAddress : (followId)=> `/api/v1/users/follow-user/${followId}`,
    updateDPAddress: (userId)=>`/api/v1/users/upload-profile-picture/${userId}`,
    
    createPostAddress : ()=> `/api/v1/posts/create-post/`,
    getPostAddress : (postId)=> `/api/v1/posts/get-post/${postId}`,
    searchPostsAddress: (query)=>`/api/v1/posts/search-posts?searchTerm=${query}`,
    getPostsAddress : ()=> `/api/v1/posts/get-posts/`,
    deletePostAddress : (postId)=> `/api/v1/posts/delete-post/${postId}`,
    updatePostAddress : (postId)=> `/api/v1/posts/edit-post/${postId}`,
    likePostAddress : (postId, userId)=> `/api/v1/posts/like-post/${postId}/${userId}`,
    allPostAnalytics: ()=>`/api/v1/posts/all-post-analytics`,
    savePostAddress : (postId, userId)=> `/api/v1/posts/save-post/${postId}/${userId}`,
    getSavedPostAddress: (userId)=>`/api/v1/posts/saved-posts/${userId}`,

    createCommentAddress : ()=> `/api/v1/comments/create-comment/`,
    getCommentsAddress : ()=> `/api/v1/comments/comments-on-post/`,
    likeCommentAddress : (commentId, userId)=> `/api/v1/comments/like-comment/${commentId}/${userId}`,
    updateCommentsAddress : (commentId)=> `/api/v1/comments/update-comment/${commentId}`,
    deleteCommentAddress : (commentId)=> `/api/v1/comments/delete-comment/${commentId}`,

    createFeedbackAddress: (authorId)=>`/api/v1/feedback/send-feedback/${authorId}`,
}
