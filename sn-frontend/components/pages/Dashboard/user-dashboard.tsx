'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to fetch recipes');
      setLoading(false);
    }
  };

  fetchUserRecipes();
}, []);

  if (loading) return <div className="p-4">Loading recipes...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Submitted Recipes</h1>

      {recipes.length === 0 ? (
        <p>No recipes submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="border rounded-xl p-4 shadow-md bg-white">
              <div className="flex flex-col md:flex-row gap-4">
                {recipe.image_url && (
                  <Image
                    src={`http://localhost:3001${recipe.image_url}`}
                    alt={recipe.name}
                    width={160}
                    height={160}
                    className="w-full md:w-40 h-40 object-cover rounded-md"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{recipe.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(recipe.createdAt).toLocaleDateString()} • Status:{' '}
                    <span
                      className={
                        recipe.status === 'approved'
                          ? 'text-green-600 font-semibold'
                          : recipe.status === 'rejected'
                          ? 'text-red-600 font-semibold'
                          : 'text-yellow-600 font-semibold'
                      }
                    >
                      {recipe.status}
                    </span>
                  </p>
                  <p><strong>Category:</strong> {recipe.category}</p>
                  <p><strong>Servings:</strong> {recipe.servings}</p>
                  <p><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
                  <p><strong>Cook Time:</strong> {recipe.cookTime} mins</p>
                  <p><strong>Tags:</strong> {recipe.tags?.join(', ') || 'None'}</p>
                  <p className="mt-2 text-gray-700">{recipe.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
