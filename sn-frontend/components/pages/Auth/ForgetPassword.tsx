"use client";

import React, { useState } from 'react';
import styles from "./ForgetPassword.module.css"
import Image from 'next/image';
import { IoKeyOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <main className={styles.main}>
      <Image src="/images/brain_forgetpassword.png" alt="Forget Password" className={styles.image} width={400} height={400} />
      
      <section className={styles.container}>
        
        <section className={styles.headers}>
          <div className={styles.header1}>
            <IoKeyOutline className={styles.icon} />
            <p className={styles.header}>Forgot your Password?</p>
          </div>
          <h2 className={styles.secondHeader}>Enter your email to receive a password reset link.</h2>
        </section>

        <section className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              placeholder='username@gmail.com' 
              onChange={(e) => setEmail(e.target.value)} 
              className={styles.input} 
              required 
            />
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submit}>Submit</button>
            </div>
          </form>

          <div className={styles.backLogin}>
            <MdKeyboardArrowLeft className={styles.icon} />
            <a href="/login" className={styles.link}>Back to Login</a>
          </div>

          </section>

      </section>




    </main>
  )
}

export default ForgetPassword