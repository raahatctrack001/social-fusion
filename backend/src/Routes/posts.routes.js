import express from "express"
import { isUserLoggedIn } from "../Middlewares/auth.middleware.js";
import { 
    createPost, 
    deletePost, 
    // editPost, 
    getPost, 
    getPosts, 
    likePost,
    allPostAnalytics,
    searchPosts,
    updatePost,
    savePost,
    getSavedPosts,
    toggleDisableComment,
    getFollowers,
    getFollowings
} from "../Controllers/posts.controllerrs.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();


router.route("/create-post").post(upload.any(), isUserLoggedIn, createPost);
router.route("/search-posts").post(isUserLoggedIn, searchPosts);
router.route("/get-posts").get(isUserLoggedIn, getPosts);
router.route("/get-post/:postId").get(isUserLoggedIn, getPost);
router.route("/delete-post/:postId").delete(isUserLoggedIn, deletePost);
router.route("/edit-post/:postId").put(upload.any(), isUserLoggedIn, updatePost);
router.route("/like-post/:postId/:userId").post(isUserLoggedIn, likePost);
router.route("/all-post-analytics").get(isUserLoggedIn, allPostAnalytics);
router.route("/save-post/:postId/:userId").post(isUserLoggedIn, savePost);
router.route("/saved-posts/:userId").get(isUserLoggedIn, getSavedPosts);
router.route("/toggle-comment-section/:postId").patch(isUserLoggedIn, toggleDisableComment)
router.route("/get-followers/:userId").get(isUserLoggedIn, getFollowers);
router.route("/get-followings/:userId").get(isUserLoggedIn, getFollowings);
export default router;