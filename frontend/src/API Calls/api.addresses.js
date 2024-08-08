export const registerAddress = () => `/api/v1/auth/register`;
export const loginAddress = ()=> `/api/v1/auth/login`;
export const logoutAddress = ()=> `/api/v1/auth/logout`;

export const getUser = (userId)=> `/api/v1/users/get-users/${userId}`;
export const getUsers = ()=> `/api/v1/users/get-users/`;
export const deleteUser = (userId)=> `/api/v1/users/delete-user/${userId}`;
export const updateUser = (userId)=> `/api/v1/users/update-user/${userId}`;
export const updateProfilePic = (userId)=> `/api/v1/users/upload-profile-picture/${userId}`;
export const followUser = (followerId, followingId)=> `/api/v1/users/follow/${followerId}/${followingId}`;

export const createPost = ()=> `/api/v1/posts/create-post/`;
export const getPost = (postId)=> `/api/v1/posts/get-post/${postId}`;
export const getPosts = ()=> `/api/v1/posts/get-posts/`;
export const deletePost = (postId)=> `/api/v1/posts/delete-post/${postId}`;
export const editPost = (postId)=> `/api/v1/posts/edit-post/${postId}`;
export const likePost = (postId, userId)=> `/api/v1/posts/like-post/${postId}/${userId}`;

export const createComment = ()=> `/api/v1/comments/create-comment/`
export const getComments = ()=> `/api/v1/comments/comments-on-post/`;
export const likeComment = (commentId, userId)=> `/api/v1/comments/like-comment/${commentId}/${userId}`;
export const updateComments = (commentId)=> `/api/v1/comments/update-comment/${commentId}`;
export const deleteComment = (commentId)=> `/api/v1/comments/delete-comment/${commentId}`;

