import express from 'express';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { 
    createComment, 
    deleteComment, 
    getComment, 
    getCommentsOnPost, 
    likeComment, 
    replyComment, 
    updateComment 
} from '../Controllers/comment.controller.js';
import { upload } from '../Middlewares/multer.middleware.js';


const router = express.Router();

router.route("/create-comment/:postId/:userId").post(upload.none(), isUserLoggedIn, createComment);
router.route("/reply-comment/:parentCommentId/:userId").post(upload.none(), isUserLoggedIn, replyComment);
router.route("/comments-on-post/:postId").get(getCommentsOnPost);
router.route("/get-comment/:commentId").get(getComment);
router.route("/delete-comment/:commentId").delete(isUserLoggedIn, deleteComment);
router.route("/update-comment/:commentId").patch(upload.none(), isUserLoggedIn, updateComment);
router.route("/like-comment/:commentId/:authorId").post(isUserLoggedIn, likeComment);

export default router;