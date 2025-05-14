"use client";

import React, { useState } from 'react';
import styles from "./ForgetPassword.module.css";
import Image from 'next/image';
import { IoKeyOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import axios from 'axios';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/forgot-password', { email });
      setMessage(res.data.message);
      setStep(2); // Go to password reset
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Something went wrong');
      } else {
        setMessage('Something went wrong');
      }
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/reset-password', { email, newPassword });
     if (res.status === 200) {
      alert("Password updated successfully!");
      window.location.href = "/login?message=Password+updated+successfully";
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <main className={styles.main}>
      <Image src="/images/brain_forgetpassword.png" alt="Forget Password" className={styles.image} width={400} height={400} />
      
      <section className={styles.container}>
        <section className={styles.headers}>
          <div className={styles.header1}>
            <IoKeyOutline className={styles.icon} />
            <p className={styles.header}>Forgot your Password?</p>
          </div>
          <h2 className={styles.secondHeader}>
            {step === 1 ? 'Enter your email to receive a password reset link.' : 'Enter your new password below.'}
          </h2>
        </section>

        <section className={styles.formContainer}>
          {message && <p style={{ color: 'red', marginBottom: '1rem' }}>{message}</p>}

          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className={styles.form}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="username@gmail.com"
                required
              />
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submit}>Submit</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordReset} className={styles.form}>
              <label htmlFor="newPassword" className={styles.label}>New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter new password"
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$"
                title="Password must be at least 5 characters long and contain both letters and numbers"
              />
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submit}>Reset Password</button>
              </div>
            </form>
          )}

          <div className={styles.backLogin}>
            <MdKeyboardArrowLeft className={styles.icon} />
            <a href="/login" className={styles.link}>Back to Login</a>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ForgetPassword;
