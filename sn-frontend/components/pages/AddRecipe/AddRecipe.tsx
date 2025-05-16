"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./AddRecipe.module.css";
import CoverPhotoUploader from "@/components/inputs/CoverPhotoUploader";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";

interface Recipe {
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  prepTime: string; 
  cookTime: string;
  servings: string;
  category: string;
  image: File | null;
  imagePreview?: string;
  tags: string[];
}

type CategoryOption = {
  label: string;
  value: string;
};

type TagOption = {
  label: string;
  value: string;
};

const categoryOptions: CategoryOption[] = [
  { value: 'nepali', label: 'Nepali' },
  { value: 'newari', label: 'Newari' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'local', label: 'Local' },
  { value: 'dessert', label: 'Dessert' },
];

const tagOptions: TagOption[] = [
  { value: 'spicy', label: 'Spicy' },
  { value: 'sweet', label: 'Sweet' },
  { value: 'savory', label: 'Savory' },
  { value: 'healthy', label: 'Healthy' },
  { value: 'quick', label: 'Quick' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'low-carb', label: 'Low-Carb' },
  { value: 'high-protein', label: 'High-Protein' },
  { value: 'comfort-food', label: 'Comfort Food' },
  { value: 'holiday', label: 'Holiday' },
  { value: 'snack', label: 'Snack' },
  { value: 'soup', label: 'Soup' },
  { value: 'salad', label: 'Salad' },   
];


const AddRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    description: "",
    ingredients: "1. ",
    instructions: "1. ",
    prepTime: "",
    cookTime: "",
    servings: "",
    category: "",
    image: null,
    tags: [],
  });

  const [category, setCategory] = useState<CategoryOption | null>(null);
  const [tags, setTags] = useState<TagOption[]>([]);

  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

const handleCategoryChange = (selected: CategoryOption | null) => {
  setCategory(selected);
  setRecipe((prev) => ({
    ...prev,
    category: selected?.value || '',
  }));
};

const handleTagChange = (
  selected: MultiValue<TagOption>,
) => {
  setTags(selected as TagOption[]);
  setRecipe((prev) => ({
    ...prev,
    tags: selected.map((tag) => tag.value),
  }));
};

  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    field: "ingredients" | "instructions"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const lines = recipe[field].split("\n");
      lines.push(`${lines.length + 1}. `);
      setRecipe((prev) => ({
        ...prev,
        [field]: lines.join("\n"),
      }));
    }
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", recipe.name);
  formData.append("description", recipe.description);
  formData.append("ingredients", recipe.ingredients);
  formData.append("instructions", recipe.instructions);
  formData.append("prepTime", recipe.prepTime);
  formData.append("cookTime", recipe.cookTime);
  formData.append("servings", recipe.servings);
  formData.append("category", recipe.category);
  formData.append("tags", JSON.stringify(recipe.tags));
  if (coverImage) {
    formData.append("image", coverImage);
  }

  try {
    const response = await fetch("http://localhost:3001/api/recipes", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("Recipe submitted successfully!");
      window.location.href = "/submitrecipe";
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error submitting recipe:", error);
    alert("Failed to submit recipe");
  }
};

  return (
    <div className={styles.main}>
        <div className={styles.container}>
      <h1 className={styles.heading}>Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.image}>
            <CoverPhotoUploader image={coverImage} setImage={setCoverImage} />
        </div>
        
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>Recipe Name</label>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="description" className={styles.label}>Description</label>
        <textarea
          name="description"
          placeholder="Short Description"
          value={recipe.description}
          onChange={handleChange}
          rows={3}
          required
          className={styles.textarea}
        />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="ingredients" className={styles.label}>Ingredients</label>
        <textarea
          name="ingredients"
          placeholder="Ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, "ingredients")}
          rows={10}
          required
          className={styles.bigTextarea}
        />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="instructions" className={styles.label}>Instructions</label>
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, "instructions")}
          rows={10}
          required
          className={styles.bigTextarea}
        />
        </div>


        <div className={styles.row}>
           <div className={styles.inputContainer}>
             <label htmlFor="prepTime" className={styles.label}>Prep Time</label>
          <input
            type="number"
            name="prepTime"
            placeholder="Prep Time (min)"
            value={recipe.prepTime}
            onChange={handleChange}
            required
            className={styles.input}
          />
           </div>
           
           <div className={styles.inputContainer}>
             <label htmlFor="cookTime" className={styles.label}>Cook Time</label>
          <input
            type="number"
            name="cookTime"
            placeholder="Cook Time (min)"
            value={recipe.cookTime}
            onChange={handleChange}
            required
            className={styles.input}
          />
           </div>

            <div className={styles.inputContainer}>
            <label htmlFor="servings" className={styles.label}>Servings</label>
          <input
            type="number"
            name="servings"
            placeholder="Servings"
            value={recipe.servings}
            onChange={handleChange}
            required
            className={styles.input}
          />
            </div>
        </div>

    <div className={styles.inputContainer}>
  <label className={styles.label}>Category</label>
  {mounted && (
  <CreatableSelect
    className={styles.select}
    isClearable
    options={categoryOptions}
    onChange={handleCategoryChange}
    value={category}
    placeholder="Select or create a category"
    classNamePrefix="react-select"
  />
)}
</div>

<div className={styles.inputContainer}>
  <label className={styles.label}>Tags</label>
  {mounted && (
  <CreatableSelect
    className={styles.select}
    isMulti
    options={tagOptions}
    value={tags}
    placeholder="Add or select tags"
    onChange={handleTagChange}
    classNamePrefix="react-select"
  />
)}
</div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
           <button type="submit" className={styles.button}>
  Submit Recipe
</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddRecipe;
