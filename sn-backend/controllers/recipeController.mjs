import Recipe from '../models/recipe.mjs';
import User from '../models/user.mjs';

// ✅ Submit a new recipe (user)
export const createRecipe = async (req, res) => {
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

    let tagsArray = [];
    try {
      if (tags) tagsArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
    } catch (parseErr) {
      return res.status(400).json({ error: 'Tags must be a valid JSON array' });
    }

    const recipe = await Recipe.create({
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
      userId: req.user.id,
      status: 'pending',
    });

    res.status(201).json({ message: 'Recipe submitted successfully', recipe });
  } catch (error) {
    console.error('❌ Error creating recipe:', error);
    res.status(500).json({ message: 'Failed to submit recipe', error: error.message });
  }
};

// ✅ Get all recipes (admin only)
export const getAllRecipes = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const recipes = await Recipe.findAll({
      include: { model: User, attributes: ['id', 'name', 'email'] },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error('❌ Error fetching recipes:', error);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
};

// ✅ Get recipes submitted by logged-in user
export const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error('❌ Error fetching user recipes:', error);
    res.status(500).json({ message: 'Failed to fetch your recipes' });
  }
};

// ✅ Get a specific recipe by ID
export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('❌ Error fetching recipe:', error);
    res.status(500).json({ message: 'Failed to fetch recipe' });
  }
};

// ✅ Approve or reject a recipe (admin only)
export const updateRecipeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can update status' });
  }

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    recipe.status = status;
    await recipe.save();

    res.status(200).json({ message: `Recipe ${status}`, recipe });
  } catch (error) {
    console.error('❌ Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

// ✅ Delete a recipe (by owner or admin)
export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (req.user.role !== 'admin' && recipe.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this recipe' });
    }

    await recipe.destroy();
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting recipe:', error);
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
};
