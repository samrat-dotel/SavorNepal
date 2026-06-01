"use client";

import React from "react";
import DrecipeCard from "@/components/cards/DrecipeCard";
import RecipeCard from "@/components/cards/RecipeCard";
import styles from "./RecipesPage.module.css";

export default function RecentRecipePage() {
    return (
        <main className={styles.pageContainer}>
            <section className={styles.heroSection}>
                <p className={styles.label}>Fresh from SavorNepal</p>
                <h1 className={styles.pageHeading}>Recent Approved Recipes</h1>
                <p className={styles.pageText}>
                    Explore newly approved recipes from users along with selected classic dishes.
                </p>
            </section>

            <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                    <h2>Recently Added Recipes</h2>
                    <p>These recipes are loaded dynamically from the database.</p>
                </div>

                <DrecipeCard limit={12} fetchUrl="/api/recipes/recent" />
            </section>

            <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                    <h2>Featured Recipes</h2>
                    <p>These are the existing recipes already available in the project.</p>
                </div>

                <RecipeCard />
            </section>
        </main>
    );
}