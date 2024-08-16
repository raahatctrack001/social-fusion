import express from 'express';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { createFeedback } from '../Controllers/feedback.controllers.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/send-feedback/:authorId').post(isUserLoggedIn, upload.none(), createFeedback);


export default router;