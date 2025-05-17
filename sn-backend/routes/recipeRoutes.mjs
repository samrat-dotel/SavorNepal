// routes/recipeRoutes.mjs

import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createRecipe,
  getAllRecipes,
  getUserRecipes,
  getRecipeById,
  updateRecipeStatus,
  getRecentApprovedRecipes,
  deleteRecipe
} from '../controllers/recipeController.mjs';
import { isAuthenticated, isAdmin } from '../middleware/auth.mjs';

const router = express.Router();

// 🔧 Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 📝 Routes
router.post('/', isAuthenticated, upload.single('image'), createRecipe);
router.get('/', isAuthenticated, isAdmin, getAllRecipes); // Admin only
router.get('/user', isAuthenticated, getUserRecipes);
router.get('/recent', getRecentApprovedRecipes);
router.get('/:id', isAuthenticated, getRecipeById);
router.patch('/:id/status', isAuthenticated, isAdmin, updateRecipeStatus); // Admin only
router.delete('/:id', isAuthenticated, deleteRecipe);

export default router;
