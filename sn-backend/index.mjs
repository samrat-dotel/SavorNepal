import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { connectDB } from './config/db.mjs';
import authRoutes from './routes/authRoutes.mjs';
import contactRoutes from './routes/contactRoutes.mjs';
import './config/passportStrategy.mjs';  // Make sure this comes after importing `passport`

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());

// Session configuration (for Passport to track login session)
app.use(session({
    secret: 'super_secret_key',  // Replace this with a strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);  // This is where Google/Facebook login routes go
app.use('/api', authRoutes);   // Keep your traditional email/password routes too
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });
}).catch((error) => {
    console.error('Error starting the server:', error);
});
