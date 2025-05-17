"use client";

import React, { useEffect, useState } from 'react';
import styles from './RecipeCard.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Recipe {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  // Add more if needed
}

interface RecipeCardProps {
  limit?: number;
  fetchUrl?: string; // Optional override
}

const DrecipeCard: React.FC<RecipeCardProps> = ({ limit, fetchUrl = '/api/recipes/recent' }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {/* 
     const token = localStorage.getItem('token'); */

const response = await axios.get(`http://localhost:3001${fetchUrl}`, {
/*   headers: {
    Authorization: `Bearer ${token}`,
  }, */
});
        const data = limit ? response.data.slice(0, limit) : response.data;
        setRecipes(data);
        console.log('Recent Recipes Response:', response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [fetchUrl, limit]);

  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

const handleRating = (recipeId: number, rating: number) => {
  setRatings((prev) => ({ ...prev, [recipeId]: rating }));
  // Optionally send this rating to your backend using axios.post()
};

  return (
    <div className={styles.cardsWrapper}>
      {recipes.map((recipe) => (
        <div key={recipe.id} className={styles.cardContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={recipe.image_url ? `http://localhost:3001${recipe.image_url}` : '/images/placeholder.png'}
              alt={recipe.name}
              width={300}
              height={300}
              className={styles.recipeImage}
            />
          </div>
          <div className={styles.detailsContainer}>
            <h2 className={styles.recipeTitle}>{recipe.name}</h2>
            <p className={styles.recipeDescription}>{recipe.description}</p>
            <p className={styles.recipeReview}><strong>Review:</strong> Not available</p>
          <div className={styles.recipeRatings}>
  <strong>Ratings:</strong>{" "}
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      onClick={() => handleRating(recipe.id, star)}
      style={{
        cursor: 'pointer',
        color: star <= (ratings[recipe.id] || 0) ? 'gold' : '#ccc',
        fontSize: '20px',
      }}
    >
      ★
    </span>
  ))}
</div>
            <button
              className={styles.viewButton}
              onClick={() => router.push(`/recipes/${recipe.id}`)}
            >
              View Recipe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrecipeCard;
