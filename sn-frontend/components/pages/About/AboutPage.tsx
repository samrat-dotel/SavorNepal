'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaAppleWhole } from "react-icons/fa6";
import { GiPineapple } from "react-icons/gi";
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [animateKey, setAnimateKey] = useState(0);

  const handleLearnMoreClick = () => {
    setShowDescription(true);
    setAnimateKey(prev => prev + 1);

    setTimeout(() => {
      document.getElementById("bottomSection")?.scrollIntoView({ behavior: "smooth" });
    }, 100); 
  };

  return (
    <section>
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          <Image 
            src="/images/about_image.png" 
            alt="Traditional Nepalese food thali" 
            width={500}
            height={500}
            className={styles.foodImage}
          />
          <div className={styles.imageOverlay}></div>
          <span className={styles.recipeCount}>
            50+ Quick Food Recipes<br />
            That Easy To Do!
          </span>
          <span className={styles.brandText}>
            <Image  
              src={"/images/logo_about.png"}
              alt="Brand Logo"
              width={100}
              height={100}
              className={styles.brandLogo}
            />
          </span>
        </div>

        <div className={styles.cardWrapper}>
          <div className={styles.rotatedBox}></div> 
          <div className={styles.contentCard}>
            <div className={styles.iconWrapper}>
              <FaAppleWhole className={styles.icon} size={40} color="#8B0000" />
              <span className={styles.iconDot}></span>
            </div>

            <h2 className={styles.title}>About Us</h2>

            <p className={styles.description}>
              Our recipes are the heart and soul of our culinary 
              community, and they reflect our commitment to 
              providing you with memorable and delightful 
              fooding experiences.
            </p>

            <button onClick={handleLearnMoreClick} className={styles.learnMoreButton}>
              Learn More
            </button>

            <div className={styles.iconBottom}>
              <GiPineapple className={styles.breadIcon} size={80} color="#CD853F" />
            </div>
          </div>
        </div>
      </div>

      {showDescription && (
        <div key={animateKey} className={`${styles.background} ${styles.animate}`} id="bottomSection">
          <h2 className={styles.mainHeading}>Discover Savor Nepal</h2>

          <div className={styles.section}>
            <div className={styles.left}>
              <p>
                <strong>Savor Nepal</strong> is a digital platform dedicated to preserving and promoting the rich culinary heritage of Nepal. 
                From the bustling kitchens of Kathmandu to the serene villages of the Himalayas, Nepalese cuisine tells the story of our 
                people, culture, and history. Our mission is to document traditional recipes, cooking techniques, and food stories that have 
                been passed down through generations but are now at risk of being forgotten.
              </p>
            </div>
            <div className={styles.right}></div>
          </div>

          <div className={styles.section}>
            <div className={styles.left}></div>
            <div className={styles.right}>
              <p>
                As the pace of modern life increases, many of Nepal&apos;s traditional food practices are being overshadowed by fast food and 
                globalized eating habits. Savor Nepal stands as a digital archive and culinary guide to ensure that our diverse and unique 
                food culture remains alive and appreciated—not only by Nepalis, but by food enthusiasts around the world. Every dish featured 
                on the platform reflects our roots and celebrates the ingredients that make our cuisine truly special.
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.left}>
              <p>
                We believe food is more than sustenance—it is a reflection of identity, memory, and community. Through vibrant visuals, 
                step-by-step recipes, and the cultural backstory of each dish, Savor Nepal offers a journey into the heart of Nepalese 
                cooking. Whether you are a home cook looking to recreate a family favorite, a foodie exploring new flavors, or someone 
                rediscovering your heritage, our platform offers something for everyone.
              </p>
            </div>
            <div className={styles.right}></div>
          </div>

          <div className={styles.section}>
            <div className={styles.left}></div>
            <div className={styles.right}>
              <p>
                Savor Nepal is more than just a recipe site—it&apos;s a cultural movement. We envision a future where Nepalese food is 
                recognized globally for its depth, flavor, and significance. By sharing our food stories with the world, we not only preserve 
                our culinary traditions but also inspire a new generation to take pride in them. Join us in savoring Nepal, one recipe at a 
                time.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutPage;
