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
    removeProfilePicture,
    checkIfUsernameExists,
    checkIfUserExists,
    searchUsers,
} from '../Controllers/user.controller.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/upload-profile-picture/:userId').patch(isUserLoggedIn, upload.single("profilePicture"), uploadProfilePicture)
router.route('/update-user/:userId').patch(isUserLoggedIn, upload.none(), updateUser)
router.route('/remove-dp/:userId').patch(isUserLoggedIn, removeProfilePicture);
router.route('/get-users/:page').get(/* isUserLoggedIn, */ getUsers);
router.route('/get-user/:userId').get(isUserLoggedIn, getUser) //only userId
router.route('/delete-user/:userId').delete(isUserLoggedIn, deleteUser);
router.route('/image-upload').post(upload.single("postImage"), isUserLoggedIn, imageUpload);
router.route('/follow-user/:followId').post(isUserLoggedIn, toggleFollowUser);
router.route('/toggle-online-status/:userId').patch(upload.none(), isUserLoggedIn, toggleOnlineStatus);
router.route('/is-username-available').post(upload.none(), checkIfUsernameExists);//only username
router.route('/check-if-user-exists').post(upload.none(), checkIfUserExists);//username or email
router.route('/search-users').post(upload.none(), searchUsers);
export default router;