export  const apiEndPoints = {
    registerAddress : () => `/api/v1/auth/register`,
    loginAddress : ()=> `/api/v1/auth/login`,
    logoutAddress : ()=> `/api/v1/auth/logout`,
    
    getUserAddress : (userId)=> `/api/v1/users/get-user/${userId}`,
    getUsersAddress : ()=> `/api/v1/users/get-users/`,
    deleteUserAddress : (userId)=> `/api/v1/users/delete-user/${userId}`,
    updateUserAddress : (userId)=> `/api/v1/users/update-user/${userId}`,
    updateProfilePic : (userId)=> `/api/v1/users/upload-profile-picture/${userId}`,
    followUserAddress : (followId)=> `/api/v1/users/follow-user/${followId}`,
    
    createPostAddress : ()=> `/api/v1/posts/create-post/`,
    getPostAddress : (postId)=> `/api/v1/posts/get-post/${postId}`,
    searchPostsAddress: (query)=>`/api/v1/posts/search-posts?searchTerm=${query}`,
    getPostsAddress : ()=> `/api/v1/posts/get-posts/`,
    deletePostAddress : (postId)=> `/api/v1/posts/delete-post/${postId}`,
    editPostAddress : (postId)=> `/api/v1/posts/edit-post/${postId}`,
    likePostAddress : (postId, userId)=> `/api/v1/posts/like-post/${postId}/${userId}`,
    
    createCommentAddress : ()=> `/api/v1/comments/create-comment/`,
    getCommentsAddress : ()=> `/api/v1/comments/comments-on-post/`,
    likeCommentAddress : (commentId, userId)=> `/api/v1/comments/like-comment/${commentId}/${userId}`,
    updateCommentsAddress : (commentId)=> `/api/v1/comments/update-comment/${commentId}`,
    deleteCommentAddress : (commentId)=> `/api/v1/comments/delete-comment/${commentId}`,
}
