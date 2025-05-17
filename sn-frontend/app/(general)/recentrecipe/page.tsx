"use client";

import React from 'react';
import DrecipeCard from '@/components/cards/DrecipeCard';

export default function RecentRecipePage() {
  return (
    <div>
      <h1>Recent Approved Recipes</h1>
      <DrecipeCard limit={12} fetchUrl="/api/recipes/recent" />
    </div>
  );
}
