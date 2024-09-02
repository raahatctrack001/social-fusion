import express from 'express';
import { isUserLoggedIn } from '../../Middlewares/auth.middleware.js';
import { getAllConversationOfUser, getConversation, openOrCreateNewConverstaion } from '../../Controllers/message controllers/conversation.controllers.js';

const router = express.Router();

router.route('/open-or-create/:senderId/:receiverId').post(isUserLoggedIn, openOrCreateNewConverstaion);
router.route('/get-conversations/:userId').get(isUserLoggedIn, getAllConversationOfUser);
router.route('/get-conversation/:conversationId').get(isUserLoggedIn, getConversation);
export default router;