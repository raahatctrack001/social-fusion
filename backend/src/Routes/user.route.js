import express from 'express'
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import {
    deleteUser,
    toggleFollowUser,
    getUser, 
    getUsers, 
    imageUpload, 
    updateUser, 
    uploadProfilePicture, 
    toggleOnlineStatus,
} from '../Controllers/user.controller.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/upload-profile-picture/:userId').patch(isUserLoggedIn, upload.single("profilePicture"), uploadProfilePicture)
router.route('/update-user/:userId').patch(isUserLoggedIn, upload.none(), updateUser)
router.route('/get-users').get(/* isUserLoggedIn, */ getUsers);
router.route('/get-user/:userId').get(isUserLoggedIn, getUser)
router.route('/delete-user/:userId').delete(isUserLoggedIn, deleteUser);
router.route('/image-upload').post(upload.single("postImage"), isUserLoggedIn, imageUpload);
router.route('/follow-user/:followId').post(isUserLoggedIn, toggleFollowUser);
router.route('/toggle-online-status/:userId').patch(upload.none(), isUserLoggedIn, toggleOnlineStatus);
export default router;