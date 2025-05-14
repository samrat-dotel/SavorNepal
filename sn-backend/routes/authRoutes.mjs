import express from 'express';
import { signup, login, forgotPassword, resetPassword } from '../controllers/authController.mjs';


const router = express.Router();

// POST route for user registration
router.post('/signup', signup);

// POST route for user login
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


export default router;
