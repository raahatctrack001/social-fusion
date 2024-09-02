import express from 'express'
import { isUserLoggedIn } from '../../Middlewares/auth.middleware.js';
import { getAllMessageOfUserWithAnotherUser, sendPrivateMessage } from '../../Controllers/message controllers/message.controllers.js';
import { upload } from '../../Middlewares/multer.middleware.js';

const router = express.Router();

router.route("/send-message/:senderId/:receiverId/:conversationId").post(upload.none(), isUserLoggedIn, sendPrivateMessage);
router.route("/get-all-messages/:senderId/:receiverId/:conversationId").get(isUserLoggedIn, getAllMessageOfUserWithAnotherUser)
export default router;