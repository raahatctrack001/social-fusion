import express from 'express'
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import {
    deleteUser,
    followUnfollow, 
    getUser, 
    getUsers, 
    imageUpload, 
    updateUser, 
    uploadProfilePicture 
} from '../Controllers/user.controller.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/upload-profile-picture/:userId').post(isUserLoggedIn, upload.single('profilePic'), uploadProfilePicture)
router.route('/update-user/:userId').patch(isUserLoggedIn, upload.none(), updateUser)
router.route('/get-users').get(/* isUserLoggedIn, */ getUsers);
router.route('/get-user/:userId').get(isUserLoggedIn, getUser)
router.route('/delete-user/:userId').delete(isUserLoggedIn, deleteUser);
router.route('/follow/:followerId/:followingId').post(isUserLoggedIn, followUnfollow)
router.route('/image-upload').post(upload.single("postImage"), isUserLoggedIn, imageUpload);
export default router;