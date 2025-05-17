// app/admin-dashboard/page.tsx or components/AdminDashboard.tsx

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './AdminDashboard.module.css';

type Recipe = {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  status: string;
  createdAt: string;
  userId: number;
};

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/recipes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes.');
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3001/api/recipes/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update status.');
    }
  };

  if (loading) return <div className={styles.loading}>Loading recipes...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.dashboardWrapper}>
      <h1 className={styles.title}>Admin Recipe Management</h1>
      <div className={styles.cardsWrapper}>
        {recipes.map((recipe) => (
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
              <p className={styles.recipeDescription}>{recipe.description}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={
                    recipe.status === 'approved'
                      ? styles.approved
                      : recipe.status === 'rejected'
                      ? styles.rejected
                      : styles.pending
                  }
                >
                  {recipe.status}
                </span>
              </p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.approveBtn}
                  onClick={() => handleStatusChange(recipe.id, 'approved')}
                >
                  Approve
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => handleStatusChange(recipe.id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
