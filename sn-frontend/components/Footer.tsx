"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
    <div className={styles.backToTop}>
      <button 
        className={styles.backToTopButton} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ⬆️ Back to top
      </button>
    </div>

      <div className={styles.footerContainer}>
        <div className={styles.menuSection}>
            <h3>Menu</h3>
          <ul className={styles.menu}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/recipe">Recipe</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className={styles.categories}>
          <h3>Categories</h3>
          <ul>
            <li>Newari Cuisine</li>
            <li>Thakali Cuisine</li>
            <li>Limbu Cuisine</li>
            <li>Madhesi Cuisine</li>
            <li>Lohorung Cuisine</li>
          </ul>
        </div>

        <div className={styles.social}>
          <h3>Social</h3>
          <div className={styles.socialIcons}>
            <FaFacebookF />
            <FaTwitter />
            <FaEnvelope />
            <FaInstagram />
          </div>
        </div>

        <div className={styles.newsletter}>
          <h3>Sign up for our newsletter</h3>
          
          <div style={{display: "flex", gap: ".5rem", alignItems: "center", justifyContent: "center"}}>
            <input type="email" placeholder="Your Email Address" />
          <button className={styles.submitButton}>Submit</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
