import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createRecipe,
  getAllRecipes,
  getUserRecipes,
  getRecipeById,
  updateRecipeStatus,
  deleteRecipe
} from '../controllers/recipeController.mjs';
import { isAuthenticated } from '../middleware/isAuthenticated.mjs';

const router = express.Router();

// 🔧 Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 🔄 Route to create recipe (send directly to controller)
router.post('/', isAuthenticated, upload.single('image'), createRecipe);

// 🧾 Other routes
router.get('/', isAuthenticated, getAllRecipes);
router.get('/user', isAuthenticated, getUserRecipes);
router.get('/:id', getRecipeById);
router.patch('/:id/status', isAuthenticated, updateRecipeStatus);
router.delete('/:id', isAuthenticated, deleteRecipe);

export default router;
