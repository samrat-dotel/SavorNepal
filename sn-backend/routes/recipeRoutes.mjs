import express from 'express';
import multer from 'multer';
import path from 'path';
import Recipe from '../models/recipe.mjs';

const router = express.Router();

// Configure multer to store uploaded images in 'uploads/' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      category,
      tags,
    } = req.body;

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const tagsArray = tags ? JSON.parse(tags) : [];

    const newRecipe = await Recipe.create({
      name,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      category,
      tags: tagsArray,
      image_url,
    });

    res.status(201).json({ message: 'Recipe submitted successfully', recipe: newRecipe });
  } catch (error) {
    console.error('Error submitting recipe:', error);
    res.status(500).json({ error: 'Failed to submit recipe' });
  }
});

export default router;
