"use client";

import React from 'react'
import styles from './Home.module.css'
import Image from 'next/image';

const Home = () => {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <div className={styles.title}>
                Discover the Joy of Cooking: Master Delicious Recipes with Ease
            </div>

            <div className={styles.description}>
                Discover more than <span style={{color: '#f79f1a'}}>10,000 recipes</span> in your hand with the best recipe. Help you to find the easiest way to cook.
            </div>

                <button className={styles.button} onClick={() => window.location.href = '/recipes'}>
                    Explore Recipe
                </button>
        </div>

        <div className={styles.image}>
            <div className={styles.circle}></div>
            <Image src="/images/home_image.png" alt="Home Image" width={800} height={800} className={styles.homeImage} />
        </div>
    </main>
  )
}

export default Home