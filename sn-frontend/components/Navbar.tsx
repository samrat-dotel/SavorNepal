import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineSearch } from "react-icons/ai"; // Import search icon
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src="/images/home_logo.png" alt="Savor Nepal" className={styles.image} width={150} height={100} />
                    </Link>
                </div>

                <div className={styles.searchContainer}>
                    <input type="text" placeholder="Search recipes..." className={styles.searchInput} />
                    <button className={styles.searchButton}>
                        <AiOutlineSearch size={20} />
                    </button>
                </div>

                <div className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/about" className={styles.navLink}>About Us</Link>
                    <Link href="/recipes" className={styles.navLink}>Recipes</Link>
                    <Link href="/contact" className={styles.navLink}>Contact Us</Link>
                    <Link href="/login" className={`${styles.navLink} ${styles.login}`}>Login</Link>
                    <Link href="/signup" className={`${styles.navLink} ${styles.signup}`}>Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
