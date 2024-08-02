import express from 'express';
import { 
    deleteUser, 
    googleLogin, 
    loginUser, 
    logoutUser, 
    registerUser, 
    resetPassword, 
    updatePassword 
} from '../Controllers/auth.controllers.js'; 
import { upload } from '../Middlewares/multer.middleware.js';   
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
router.route("/register").post(upload.none(), registerUser)


export default router;

