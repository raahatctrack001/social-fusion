import express from 'express';
import { isUserLoggedIn } from '../../Middlewares/auth.middleware.js';
import { getAllConversationOfSender, openOrCreateNewConverstaion } from '../../Controllers/message controllers/conversation.controllers.js';

const router = express.Router();

router.route('/open-or-create/:senderId/:receiverId').post(isUserLoggedIn, openOrCreateNewConverstaion);
router.route('/get-conversations/:senderId').get(isUserLoggedIn, getAllConversationOfSender);

export default router;