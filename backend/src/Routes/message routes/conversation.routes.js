import express from 'express';
import { isUserLoggedIn } from '../../Middlewares/auth.middleware.js';
import { openOrCreateNewConverstaion } from '../../Controllers/message controllers/conversation.controllers.js';

const router = express.Router();

router.route('/open-or-create/:senderId/:receiverId').post(isUserLoggedIn, openOrCreateNewConverstaion);

export default router;