import express from 'express';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { upload } from '../Middlewares/multer.middleware.js';
import { createAndSendOTP, sendEmailToUser, sendMessageToMobile, verifyOTP } from '../Controllers/otp.controllers.js';

const router = express.Router();
router.route('/send-email').post(upload.none(), createAndSendOTP );
router.route('/verify-email').post(upload.none(), verifyOTP);
router.route('/send-sms').post(sendMessageToMobile);


export default router;