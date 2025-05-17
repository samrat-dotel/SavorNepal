// RecipeCard.tsx
"use client";

import React, { useState } from 'react';
import styles from './RecipeCard.module.css';
import Image from 'next/image';
import recipeData from '../data/data';
import { useRouter } from 'next/navigation';

interface RecipeCardProps {
  limit?: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ limit }) => {
  const router = useRouter();
  const recipesToDisplay = limit ? recipeData.slice(0, limit) : recipeData;

  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

const handleRating = (recipeId: number, rating: number) => {
  setRatings((prev) => ({ ...prev, [recipeId]: rating }));
  // Optionally send this rating to your backend using axios.post()
};

  return (
    <div className={styles.cardsWrapper}>
      {recipesToDisplay.map((recipe) => (
        <div key={recipe.id} className={styles.cardContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={recipe.image}
              alt={recipe.name}
              width={300}
              height={300}
              className={styles.recipeImage}
            />
          </div>
          <div className={styles.detailsContainer}>
            <h2 className={styles.recipeTitle}>{recipe.name}</h2>
            <p className={styles.recipeDescription}>{recipe.description}</p>
            <p className={styles.recipeReview}><strong>Review:</strong> {recipe.review}</p>
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

export default RecipeCard;
