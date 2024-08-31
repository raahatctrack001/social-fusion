import express from 'express';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { createNewConversation } from '../Controllers/conversation.controller.js';

const router = express.Router();
router.route('/create-new-conversation/:senderId/:receiverId').post(isUserLoggedIn, createNewConversation);


export default router;