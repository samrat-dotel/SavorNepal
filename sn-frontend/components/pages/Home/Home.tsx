"use client";

import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import RecipeCard from "@/components/cards/RecipeCard";
import DrecipeCard from "@/components/cards/DrecipeCard";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const titleSentences: string[] = [
    "Discover the Joy of Cooking: Master Delicious Recipes with Ease",
    "नेपाली भान्सा कुनै ट्रेन्ड होइन – यो रक्षा गर्नुपर्ने सम्पदा हो।",
    "जहाँ अमन पकाउँछन्, सम्राट सजाउँछन्, र रक्षा जोगाउँछिन् परम्पराको आत्मा।",
    "तीन कथाकार – अमन, सम्राट, र रक्षा; एक उद्देश्य – नेपाली खानाको पुनर्जागरण।",
    "स्वाद मात्र होइन, संस्कृतिको रक्षा गरौं हरेक परिकारमा।",
    "अमनको भान्सा, सम्राटको कल्पना, र रक्षाको संस्कृति – यही हो स्वादको त्रिकोण।",
  ];

  const descriptionSentences: string[] = [
    "Discover more than 10,000 recipes and become a kitchen hero today!",
    "सामाग्री र विधिहरूको विस्तृत विवरणका साथ, तपाईंको भान्सामा नयाँ जीवन ल्याउनुहोस्।🇳🇵",
    "संसारलाई चिनाऔं, नेपाली खानाको स्वादले!🇳🇵",
    "ढिँडो होस् या मोमो, प्रत्येक थालमा संस्कृति झल्कोस्!🇳🇵",
    "रक्षा गरौं तिनै परिकारहरूको, जसले हामीलाई हाम्रो जरा सम्झाउँछन्।🇳🇵",
    "संसारको स्वादको खोजीमा, हामीलाई साथ दिनुहोस्।🇳🇵",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titleSentences.length);
        setFade(true); // Start fade-in
      }, 500); // Fade duration
    }, 3000);

    return () => clearInterval(interval);
  }, [titleSentences.length]);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div
            className={styles.title}
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {titleSentences[index]}
          </div>

          <div
            className={styles.description}
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {descriptionSentences[index]}
          </div>

          <button
            className={styles.button}
            onClick={() => router.push("/recipes")}
          >
            Explore Recipe
          </button>
        </div>

        <div className={styles.image}>
          <div className={styles.circle}></div>
          <Image
            src="/images/home_image.png"
            alt="Home Image"
            width={800}
            height={800}
            className={styles.homeImage}
          />
        </div>
      </div>

      <div className={styles.cardContainer1}>
        <h2 className={styles.heading}> Popular Recipes </h2>
        <RecipeCard limit={4} />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            className={styles.button}
            onClick={() => router.push("/popularrecipe")}
          >
            See More
          </button>
        </div>

    
  <div className={styles.cardContainer2}>
    <h2 className={styles.heading}> Recent Recipes </h2>
    <DrecipeCard limit={4} fetchUrl="/api/recipes/recent" />
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        className={styles.button}
        onClick={() => router.push("/recentrecipe")}
      >
        See More
      </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
