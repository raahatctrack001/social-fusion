import express from "express"
import { isUserLoggedIn } from "../Middlewares/auth.middleware.js";
import { createPost } from "../Controllers/posts.controllerrs.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();


router.route("/create-post").post(upload.any(), isUserLoggedIn, createPost)






export default router;