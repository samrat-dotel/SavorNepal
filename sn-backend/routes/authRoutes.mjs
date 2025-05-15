import express from 'express';
import passport from 'passport'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { signup, login, forgotPassword, resetPassword } from '../controllers/authController.mjs';
import '../config/passportStrategy.mjs';


dotenv.config();

const router = express.Router();

// POST route for user registration
router.post('/signup', signup);

// POST route for user login
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
       res.redirect('http://localhost:3000');;
    }
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.redirect('http://localhost:3000');;
    }
);


export default router;
