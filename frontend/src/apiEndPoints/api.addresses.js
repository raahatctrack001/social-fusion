
export  const apiEndPoints = {
    isAuthorisedAddress: ()=>`/api/v1/auth/authorisation-status`,
    registerAddress : () => `/api/v1/auth/register`,
    loginAddress : ()=> `/api/v1/auth/login`,
    logoutAddress : ()=> `/api/v1/auth/logout`,
    updatePasswordAddress: (authorId)=>`/api/v1/auth/update-password/${authorId}`,
    sendResetPasswordToken: ()=>`/api/v1/auth/forgot-password`,
    verifyResetPasswordToken: (token)=>`/api/v1/auth/verify-reset-password-token/${token}`,
    resetForgotPasswordAddress: (token)=>`/api/v1/auth/reset-password/${token}`,
    updatePreference: (userId)=>`/api/v1/auth/save-preferred-category/${userId}`,
    
    getUserAddress : (userId)=> `/api/v1/users/get-user/${userId}`,
    getUsersAddress : (currentPage)=> `/api/v1/users/get-users/${currentPage}`,
    deleteUserAddress : (userId)=> `/api/v1/users/delete-user/${userId}`,
    updateUserAddress : (userId)=> `/api/v1/users/update-user/${userId}`,
    removeDPAddress: (userId)=>`/api/v1/users/remove-dp/${userId}`,
    updateProfilePic : (userId)=> `/api/v1/users/upload-profile-picture/${userId}`,
    uploadStoryAddress: ()=>`/api/v1/users/upload-story`,
    toggleFollowUserAddress : (followId)=> `/api/v1/users/follow-user/${followId}`,
    updateDPAddress: (userId)=>`/api/v1/users/upload-profile-picture/${userId}`,
    toggleOnlineStatusAddress: (userId)=>`/api/v1/users/toggle-online-status/${userId}`,
    checkIfUsernameExistsAddress: ()=>'/api/v1/users/is-username-available',
    checkIfUserExistsAddress: ()=>`/api/v1/users/check-if-user-exists`,
    searchUsersAddress: (searchTerm)=>`/api/v1/users/search-users?searchTerm=${searchTerm}`,
    
    createPostAddress : ()=> `/api/v1/posts/create-post/`,
    getPostAddress : (postId)=> `/api/v1/posts/get-post/${postId}`,
    getPostOfUserAddress: (userId)=>`/api/v1/posts/user-posts/${userId}`,
    getPostOfUserInChat: (userId)=>`/api/v1/posts/get-post-in-chat/${userId}`,
    getHiddenPosts: (userId)=>`/api/v1/posts/hidden-posts/${userId}`,
    searchPostsAddress: (query, page)=>`/api/v1/posts/search-posts?searchTerm=${query}&page=${page}`,
    searchPostByCategory: (query, page)=>`/api/v1/posts/search-post-by-category?category=${query}&page=${page}`,
    getPostsAddress : (currentPage)=> `/api/v1/posts/get-posts/${currentPage}`,
    deletePostAddress : (postId)=> `/api/v1/posts/delete-post/${postId}`,
    updatePostAddress : (postId)=> `/api/v1/posts/edit-post/${postId}`,
    likePostAddress : (postId, userId)=> `/api/v1/posts/like-post/${postId}/${userId}`,
    allPostAnalytics: (userId, page)=>`/api/v1/posts/all-post-analytics/${userId}/?page=${page}`,
    savePostAddress : (postId, userId)=> `/api/v1/posts/save-post/${postId}/${userId}`,
    getSavedPostAddress: (userId)=>`/api/v1/posts/saved-posts/${userId}`,
    getFollowingsAddress: (userId)=>`/api/v1/posts/get-followings/${userId}`,
    getFollowersAddress: (userId)=>`/api/v1/posts/get-followers/${userId}`,
    toggleCommentSectionAddress: (postId)=>`api/v1/posts/toggle-comment-section/${postId}`,
    getLikersOfPost: (postId)=>`/api/v1/posts/likers-of-post/${postId}`,
    hideUnhidePost: (postId)=> `/api/v1/posts/hide-unhide-post/${postId}`,
    getHomePostSuggestion: (userId, page)=>`api/v1/posts/suggested-post-for-home/${userId}?page=${page}`,
    
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
    getAllStoriesOfUser: (userId)=>`/api/v1/story/get-all-stories-of-user/${userId}`,
    createNewHighlights: (userId)=>`/api/v1/story/create-new-highlights/${userId}`,
    addStoryToHighlight: (highlightId, storyId, userId)=>`/api/v1/story/add-story-to-highlight/${highlightId}/${storyId}/${userId}`,
    getHighlightStories: ()=>`/api/v1/story/get-highlights`,
    deleteHighlightAddress: (userId, highlightId)=>`/api/v1/story/delete-highlight/${userId}/${highlightId}`,
    likeStoryAddress: (storyId, userId)=>`/api/v1/story/like-story/${storyId}/${userId}`,
    deleteStoryAddress: (storyId, userId)=>`/api/v1/story/delete-story/${storyId}/${userId}`,
    removeStoryFromHighlights: (highlightId, storyId, userId)=>`/api/v1/story/remove-story-from-highlights/${highlightId}/${storyId}/${userId}`,
    getStoriesOfHighlight: (highlightId, userId)=>`/api/v1/story/get-stories-of-highlights/${highlightId}/${userId}`,
    getHighlightsOfUser: (userId)=>`/api/v1/story/get-user-highlight/${userId}`,
    getFollowerStory: (userId)=>`/api/v1/story/get-followers-stories/${userId}`,

    openOrCreateNewConversationAddress: (senderId, receiverId)=> `/api/v1/conversation/open-or-create/${senderId}/${receiverId}`,
    getAllConversationsOfUser: (userId)=> `/api/v1/conversation/get-conversations/${userId}`,
    getConversationAddress: (conversationId) => `/api/v1/conversation/get-conversation/${conversationId}`,

    sendPrivateMessageAddress: (senderId, receiverId, conversationId)=>`/api/v1/message/send-message/${senderId}/${receiverId}/${conversationId}`,
    getAllMessageOfUserWithAnotherUserAddress:(senderId, receiverId, conversationId)=>`/api/v1/message/get-all-messages/${senderId}/${receiverId}/${conversationId}`,
    sendPost: (senderId)=>`/api/v1/message/send-post/${senderId}`,

    createBook: (userId)=>`/api/v1/book/create-book/${userId}`,
    getBooks: (userId, page)=>`/api/v1/book/get-books/${userId}?page=${page}`,
    updatedBook: (bookId, userId)=>`/api/v1/book/update-book/${bookId}/${userId}`,
    getBook: (bookId)=>`/api/v1/book/get-book/${bookId}`,
    publishBook: (bookId, userId)=>`/api/v1/book/publish-book/${bookId}/${userId}`,
    getPublishedBooksOfAuthor: (userId, page)=>`/api/v1/book/published-book-author/${userId}?page=${page}`,
    getAllPublishedBooks: ()=>`/api/v1/book/published-books`,

    startContribution: (authorId, bookId, contributorId)=>`/api/v1/contribution/start-contribution/${authorId}/${bookId}/${contributorId}`,
    getContributedBooks: (userId)=>`/api/v1/contribution/get-contributed-books/${userId}`,    
}
