import express from 'express';
import { 
    deleteUser, 
    googleLogin, 
    loginUser, 
    logoutUser, 
    registerUser, 
    resetPassword, 
    updatePassword 
} from '../Controllers/auth.controllers.js';
const router = express.Router();




export default router;

