import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { connectDB } from './config/db.mjs';
import './models/association.mjs';

// Routes
import authRoutes from './routes/authRoutes.mjs';
import contactRoutes from './routes/contactRoutes.mjs';
import recipeRoutes from './routes/recipeRoutes.mjs';  // ✅ Add this for recipes


import './config/passportStrategy.mjs';  // Make sure this comes after importing `passport`

const app = express();

// CORS setup (Allow frontend to talk to backend)
app.use(cors({
    origin: 'http://localhost:3000',  // Frontend URL
    credentials: true,
}));

// Body parsers
app.use(bodyParser.json());
app.use(express.json()); // For JSON requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files from /uploads
app.use('/uploads', express.static('uploads')); // ✅ Needed to serve images

// Session configuration
app.use(session({
    secret: 'super_secret_key',  // Replace with env variable in production
    resave: false,
    saveUninitialized: false,
    cookie: {
         httpOnly: true,
        sameSite: 'lax',
        secure: false, // Change to true in production (HTTPS)
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);         // Google/Facebook OAuth
app.use('/api', authRoutes);          // Email/password auth
app.use('/api', contactRoutes);       // Contact form submission
app.use('/api/recipes', recipeRoutes);  // ✅ Recipes endpoint

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });
}).catch((error) => {
    console.error('Error starting the server:', error);
});
