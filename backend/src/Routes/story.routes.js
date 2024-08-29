import express from 'express';
import { createNewHighlights, deleteHighlight, deleteStory, deleteStoryFromHighlights, getHeighlightStories, getStoriesOfUser, likeStory, uploadStory } from '../Controllers/story.controllers.js';
import { isUserLoggedIn } from '../Middlewares/auth.middleware.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/upload-story/:userId').post(upload.array("storyFiles"), isUserLoggedIn, uploadStory)
router.route('/get-stories-of-user/:userId').get(isUserLoggedIn, getStoriesOfUser);
router.route('/create-new-highlights/:userId').post(upload.none(), isUserLoggedIn, createNewHighlights);
router.route('/get-highlights').post(upload.none(), isUserLoggedIn, getHeighlightStories);
router.route('/delete-highlight/:userId/:highlightId').delete(upload.none(), isUserLoggedIn, deleteHighlight);
router.route('/like-story/:storyId/:userId').patch(isUserLoggedIn, likeStory);
router.route('/delete-story/:storyId/:userId').delete(isUserLoggedIn, deleteStory);
router.route('/remove-story-from-highlights/:storyId/:userId').delete(isUserLoggedIn, deleteStoryFromHighlights)
// router.route('/delete-highlight')
export default router;