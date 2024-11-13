import express from 'express'
import { isUserLoggedIn } from '../../Middlewares/auth.middleware.js';
import { getAllMessageOfUserWithAnotherUser, sendPost, sendPrivateMessage } from '../../Controllers/message controllers/message.controllers.js';
import { upload } from '../../Middlewares/multer.middleware.js';

const router = express.Router();

router.route("/send-message/:senderId/:receiverId/:conversationId").post(upload.none(), isUserLoggedIn, sendPrivateMessage);
router.route("/get-all-messages/:senderId/:receiverId/:conversationId").get(isUserLoggedIn, getAllMessageOfUserWithAnotherUser)
router.route("/send-post/:senderId").post(isUserLoggedIn, sendPost); //receiver may be more than one and conversation id isnot known so receivers are in body and conversationId should be found in controllers
export default router;