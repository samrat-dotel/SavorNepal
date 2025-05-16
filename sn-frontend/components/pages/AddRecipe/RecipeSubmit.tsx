"use client"

import React from 'react'
import styles from './AddRecipe.module.css'
import Image from 'next/image'

const RecipeSubmit = () => {
  return (
    <main className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <Image src='/images/upload_success.png' alt="Background" width={500} height={500} className={styles.backgroundImage} />

        <div>
          <p className={styles.description}>Your request has been successfully submitted. Your recipe will be uploaded after admin approves it.</p>

        <p className={styles.description}>Thank you for sharing your recipe with us!</p>

        <p className={styles.description}>In the meantime, feel free to explore other recipes or check back later for updates.</p>

        <p className={styles.description}><strong>Happy cooking!</strong></p>

        <button className={styles.button} onClick={() => window.location.href = '/'}>
          Back to Home
        </button>
        </div>
        </div>

        
    </main>
  )
}

export default RecipeSubmit