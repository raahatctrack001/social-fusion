import express from 'express';
import { createNewHightlights, getHeighlightStories, getStoriesOfUser, uploadStory } from '../Controllers/story.controllers.js';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/upload-story/:userId').post(upload.array("storyFiles"), isUserLoggedIn, uploadStory)
router.route('/get-stories-of-user/:userId').get(isUserLoggedIn, getStoriesOfUser);
router.route('/create-new-highlights/:userId').post(upload.none(), isUserLoggedIn, createNewHightlights);
router.route('/get-highlights').post(upload.none(), isUserLoggedIn, getHeighlightStories);
export default router;