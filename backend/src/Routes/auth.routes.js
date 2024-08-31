import express from 'express';
import { 
    deleteUser, 
    forgotPassword, 
    googleLogin, 
    isAuthorised, 
    isEmailVerified, 
    loginUser, 
    logoutUser, 
    registerUser,
    updatePassword, 
} from '../Controllers/auth.controllers.js'; 
import { upload } from '../Middlewares/multer.middleware.js';   
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
const router = express.Router();

// upload.none()
// upload.single('avatars')
// // upload.array('avatars', 9);
// upload.fields([{
//         name: ,
//         maxCount: ,
//     },
//     {
//         name: ,
//         maxCount: ,
//     }
// ])
/*
upload.fields([{name: "first", maxCount: 1}, {name: "second", maxCount: 1}])
*/
router.route("/authorisation-status").get(isUserLoggedIn, isAuthorised);
router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(upload.none(), loginUser);
router.route("/logout").post(isUserLoggedIn, logoutUser);
router.route("/update-password/:userId").patch(upload.none(), isUserLoggedIn,  updatePassword);
router.route("/forgot-password").post(upload.none(), forgotPassword);
router.route("/delete-user").delete(isUserLoggedIn, deleteUser);
router.route("/is-email-verified").post(upload.none(), isEmailVerified);
export default router;

