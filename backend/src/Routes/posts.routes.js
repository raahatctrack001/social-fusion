import express from "express"
import { isUserLoggedIn } from "../Middlewares/auth.middleware.js";
import { createPost } from "../Controllers/posts.controllerrs.js";

const router = express.Router();


router.route("/create-post").post(isUserLoggedIn, createPost)






export default router;