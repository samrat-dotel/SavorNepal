'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './UserDashboard.module.css';

type Recipe = {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  tags: string[];
  image_url?: string;
  status: string;
  createdAt: string;
};

export default function UserDashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://localhost:3001/api/recipes/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes(res.data);
        setFilteredRecipes(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError('Failed to fetch recipes');
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter((r) => r.status === filter));
    }
  }, [filter, recipes]);

  if (loading) return <div className={styles.loading}>Loading recipes...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.dashboardWrapper}>
      <h1 className={styles.dashboardTitle}>My Submitted Recipes</h1>

      <div className={styles.filterContainer}>
        <label htmlFor="statusFilter">Filter by status:</label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className={styles.filterSelect}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredRecipes.length === 0 ? (
        <p className={styles.noRecipeText}>No recipes match the selected filter.</p>
      ) : (
        <div className={styles.cardsWrapper}>
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className={styles.cardContainer}>
              <div className={styles.imageContainer}>
                {recipe.image_url && (
                  <Image
                    src={`http://localhost:3001${recipe.image_url}`}
                    alt={recipe.name}
                    width={300}
                    height={200}
                    className={styles.recipeImage}
                  />
                )}
              </div>
              <div className={styles.detailsContainer}>
                <h2 className={styles.recipeTitle}>{recipe.name}</h2>
                <p className={styles.recipeMeta}>
                  {new Date(recipe.createdAt).toLocaleDateString()} • Status:{" "}
                  <span
                    className={
                      recipe.status === 'approved'
                        ? styles.statusApproved
                        : recipe.status === 'rejected'
                        ? styles.statusRejected
                        : styles.statusPending
                    }
                  >
                    {recipe.status}
                  </span>
                </p>
                <p className={styles.recipeDescription}>{recipe.description}</p>
                <p className={styles.recipeStats}><strong>Category:</strong> {recipe.category}</p>
                <p className={styles.recipeStats}><strong>Servings:</strong> {recipe.servings}</p>
                <p className={styles.recipeStats}><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
                <p className={styles.recipeStats}><strong>Cook Time:</strong> {recipe.cookTime} mins</p>
                <p className={styles.recipeStats}><strong>Tags:</strong> {recipe.tags.join(', ') || 'None'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
