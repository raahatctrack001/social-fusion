import express from 'express';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { upload } from '../Middlewares/multer.middleware.js';
import { createAndSendOTP, sendEmailToUser, verifyOTP } from '../Controllers/otp.controllers.js';

const router = express.Router();
router.route('/send-email').post(upload.none(), isUserLoggedIn, createAndSendOTP );
router.route('/verify-otp').get(upload.none(), isUserLoggedIn, verifyOTP);


export default router;