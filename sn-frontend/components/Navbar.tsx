'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineSearch } from "react-icons/ai";
import styles from './Navbar.module.css';

type User = {
  name: string;
  role: string; // admin or user
};

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setShowDropdown(false);
    window.location.href = '/';
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/home_logo.png"
              alt="Savor Nepal"
              className={styles.image}
              width={150}
              height={100}
            />
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

          {user?.role !== 'admin' && (
            <Link href="/addrecipe" className={styles.navLink}>Add Recipe</Link>
          )}

          <Link href="/contact" className={styles.navLink}>Contact Us</Link>

        
          {/* Login/Signup or Profile/Logout */}
          {user ? (
            <div className={styles.userWrapper} ref={dropdownRef}>
              <div className={styles.userCircle} onClick={toggleDropdown}>
                {getInitial(user.name)}
              </div>
              {showDropdown && (
                <div className={styles.logoutDropdown}>
                  <span style={{ color: 'black' }}>{user.name}</span>
                    {/* Dashboard links based on role */}
          {user?.role === 'admin' && (
            <Link href="/admin-dashboard" style={{ color: 'black', paddingTop: '5px'}}>AdminDashboard</Link>
          )}
          {user?.role === 'user' && (
            <Link href="/user-dashboard" style={{ color: 'black', paddingTop: '5px' } }>Dashboard</Link>
          )}

                  <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className={`${styles.navLink} ${styles.login}`}>Login</Link>
              <Link href="/signup" className={`${styles.navLink} ${styles.signup}`}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
