import express from 'express';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { createBook, getBooksOfUser, updateBook } from '../Controllers/book.controller.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route("/create-book/:userId").post(upload.none(), isUserLoggedIn, createBook);
router.route('/get-books/:userId').get(isUserLoggedIn, getBooksOfUser);
router.route('/update-book/:bookId/:userId').put(upload.none(), isUserLoggedIn, updateBook);
export default router;