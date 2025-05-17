"use client";

import React from 'react';
import RecipeCard from '@/components/cards/RecipeCard';
import styles from './RecipesPage.module.css';

const RecipesPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeading}>Popular Recipes</h1>
      <RecipeCard />
    </div>
  );
};

export default RecipesPage;
