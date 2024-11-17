import express from 'express';
import { upload } from '../Middlewares/multer.middleware.js';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { getContributedBook, startContribution } from '../Controllers/contribution.controller.js';

const router = express.Router();
router.route('/start-contribution/:authorId/:bookId/:contributorId').post(upload.none(), isUserLoggedIn, startContribution);
router.route('/get-contributed-books/:userId').get(isUserLoggedIn, getContributedBook);
export default router;