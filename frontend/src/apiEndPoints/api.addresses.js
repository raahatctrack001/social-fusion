export  const apiEndPoints = {
    isAuthorisedAddress: ()=>`/api/v1/auth/authorisation-status`,
    registerAddress : () => `/api/v1/auth/register`,
    loginAddress : ()=> `/api/v1/auth/login`,
    logoutAddress : ()=> `/api/v1/auth/logout`,
    updatePasswordAddress: (authorId)=>`/api/v1/auth/update-password/${authorId}`,
    
    getUserAddress : (userId)=> `/api/v1/users/get-user/${userId}`,
    getUsersAddress : ()=> `/api/v1/users/get-users/`,
    deleteUserAddress : (userId)=> `/api/v1/users/delete-user/${userId}`,
    updateUserAddress : (userId)=> `/api/v1/users/update-user/${userId}`,
    removeDPAddress: (userId)=>`/api/v1/users/remove-dp/${userId}`,
    updateProfilePic : (userId)=> `/api/v1/users/upload-profile-picture/${userId}`,
    uploadStoryAddress: ()=>`/api/v1/users/upload-story`,
    toggleFollowUserAddress : (followId)=> `/api/v1/users/follow-user/${followId}`,
    updateDPAddress: (userId)=>`/api/v1/users/upload-profile-picture/${userId}`,
    toggleOnlineStatusAddress: (userId)=>`/api/v1/users/toggle-online-status/${userId}`,
    
    createPostAddress : ()=> `/api/v1/posts/create-post/`,
    getPostAddress : (postId)=> `/api/v1/posts/get-post/${postId}`,
    searchPostsAddress: (query)=>`/api/v1/posts/search-posts?searchTerm=${query}`,
    getPostsAddress : (currentPage)=> `/api/v1/posts/get-posts/${currentPage}`,
    deletePostAddress : (postId)=> `/api/v1/posts/delete-post/${postId}`,
    updatePostAddress : (postId)=> `/api/v1/posts/edit-post/${postId}`,
    likePostAddress : (postId, userId)=> `/api/v1/posts/like-post/${postId}/${userId}`,
    allPostAnalytics: ()=>`/api/v1/posts/all-post-analytics`,
    savePostAddress : (postId, userId)=> `/api/v1/posts/save-post/${postId}/${userId}`,
    getSavedPostAddress: (userId)=>`/api/v1/posts/saved-posts/${userId}`,
    getFollowingsAddress: (userId)=>`/api/v1/posts/get-followings/${userId}`,
    getFollowersAddress: (userId)=>`/api/v1/posts/get-followers/${userId}`,
    toggleCommentSectionAddress: (postId)=>`api/v1/posts/toggle-comment-section/${postId}`,
    getLikersOfPost: (postId)=>`/api/v1/posts/likers-of-post/${postId}`,
    
    createCommentAddress : (postId, userId)=> `/api/v1/comments/create-comment/${postId}/${userId}`,
    replyCommentAddress : (parentId, userId)=> `/api/v1/comments/reply-comment/${parentId}/${userId}`,
    
    getCommentsOnPostAddress : (postId)=> `/api/v1/comments/comments-on-post/${postId}`,
    getCommentAddress: (commentId)=>`/api/v1/comments/get-comment/${commentId}`,
    likeCommentAddress : (commentId, userId)=> `/api/v1/comments/like-comment/${commentId}/${userId}`,
    updateCommentAddress : (commentId)=> `/api/v1/comments/update-comment/${commentId}`,
    deleteCommentAddress : (commentId)=> `/api/v1/comments/delete-comment/${commentId}`,

    createFeedbackAddress: (authorId)=>`/api/v1/feedback/send-feedback/${authorId}`,

    createAndSendOTP: ()=>`/api/v1/otp/send-email`,
    verifyOTPAddress: ()=>`/api/v1/otp/verify-email`,   

    addStoriesAddress: (userId)=>`/api/v1/story/upload-story/${userId}`,
    getStoriesOfUser: (userId)=>`/api/v1/story/get-stories-of-user/${userId}`,
    createNewHighlights: (userId)=>`/api/v1/story/create-new-highlights/${userId}`,
    addStoryToHighlight: (highlightId, storyId, userId)=>`/api/v1/story/add-story-to-highlight/${highlightId}/${storyId}/${userId}`,
    getHighlightStories: ()=>`/api/v1/story/get-highlights`,
    deleteHighlightAddress: (userId, highlightId)=>`/api/v1/story/delete-highlight/${userId}/${highlightId}`,
    likeStoryAddress: (storyId, userId)=>`/api/v1/story/like-story/${storyId}/${userId}`,
    deleteStoryAddress: (storyId, userId)=>`/api/v1/story/delete-story/${storyId}/${userId}`,
    removeStoryFromHighlights: (highlightId, storyId, userId)=>`/api/v1/story/remove-story-from-highlights/${highlightId}/${storyId}/${userId}`,
    getStoriesOfHighlight: (highlightId, userId)=>`/api/v1/story/get-stories-of-highlights/${highlightId}/${userId}`,
    getHighlightsOfUser: (userId)=>`/api/v1/story/get-user-highlight/${userId}`,
}
