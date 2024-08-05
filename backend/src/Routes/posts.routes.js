import express from "express"
import { isUserLoggedIn } from "../Middlewares/auth.middleware.js";
import { 
    createPost, 
    deletePost, 
    editPost, 
    getPost, 
    getPosts 
} from "../Controllers/posts.controllerrs.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();


router.route("/create-post").post(upload.any(), isUserLoggedIn, createPost);
router.route("/get-posts").get(getPosts);
router.route("/get-post/:postId").get(getPost);
router.route("/delete-post/:postId").delete(isUserLoggedIn, deletePost);
router.route("/edit-post/:postId").put(editPost);


export default router;