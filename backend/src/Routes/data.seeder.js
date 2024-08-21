import express from 'express';
import { postSeeder, seededPostDeleter, userSeeder } from '../Controllers/dataseeder.controllers.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/user-seeder').post(userSeeder);
router.route('/post-seeder').post(postSeeder);
router.route('/post-deleter').delete(seededPostDeleter);
// router.route('/generate-text').get(upload.none(), aiAPI);
export default router;