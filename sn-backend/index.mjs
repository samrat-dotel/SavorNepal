import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.mjs';
import authRoutes from './routes/authRoutes.mjs';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // For parsing JSON in requests

// Database connection


// Routes
app.use('/api', authRoutes);  // API routes for signup and login

const PORT = process.env.PORT || 3001;

// Step 4: Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });
}).catch((error) => {
    console.error('Error starting the server:', error);
});
