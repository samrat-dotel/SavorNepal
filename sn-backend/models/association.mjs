import User from './user.mjs';
import Recipe from './recipe.mjs';

// ✅ Define associations here AFTER both models are imported
Recipe.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Recipe, { foreignKey: 'userId', onDelete: 'CASCADE' });


// You can add more associations as needed

export { User, Recipe };
