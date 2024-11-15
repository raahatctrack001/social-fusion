import express from 'express';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { createBook, getBook, getBooksOfUser, getPublishedBookOfAuthor, publishBook, updateBook } from '../Controllers/book.controller.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route("/create-book/:userId").post(upload.none(), isUserLoggedIn, createBook);
router.route('/get-books/:userId').get(isUserLoggedIn, getBooksOfUser);
router.route('/update-book/:bookId/:userId').put(upload.none(), isUserLoggedIn, updateBook);
router.route('/get-book/:bookId').get(isUserLoggedIn, getBook);
router.route('/publish-book/:bookId/:userId').put(upload.none(), isUserLoggedIn, publishBook);
router.route('/published-book-author/:userId').get(isUserLoggedIn, getPublishedBookOfAuthor);
export default router;