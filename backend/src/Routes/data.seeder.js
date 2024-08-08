import express from 'express';
import { userSeeder } from '../Controllers/dataseeder.controllers.js';
import { postSeeder } from '../Controllers/dataseeder.controllers.js';

const router = express.Router();

router.route('/user-seeder').post(userSeeder);
router.route('/post-seeder').post(postSeeder);

export default router;