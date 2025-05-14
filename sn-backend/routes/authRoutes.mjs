import express from 'express';
import { signup, login } from '../controllers/authController.mjs';

const router = express.Router();

// POST route for user registration
router.post('/signup', signup);

// POST route for user login
router.post('/login', login);

export default router;
