"use client";

import React, { useState } from 'react';
import styles from './Signup.module.css';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook } from 'react-icons/im';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        setErrorMessage(""); // Clear any previous error messages
        setLoading(true);

        const userData = {
            name: username,
            email,
            password,
        };

        try {
            // Make API call to backend
            const response = await axios.post('http://localhost:3001/api/signup', userData);
            console.log('User signed up:', response.data);
            // You can redirect to login page or show a success message 
            alert("Signup completed successfully!");
            window.location.href = './login?message=Signup+completed+successfully';
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error signing up:', error.response.data.message);
                setErrorMessage(error.response.data.message);
            } else if (error instanceof Error) {
                console.error('Error signing up:', error.message);
                setErrorMessage("Error signing up, please try again.");
            } else {
                console.error('Error signing up:', error);
                setErrorMessage("Error signing up, please try again.");
            }
        }

        setLoading(false);
    }

    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <section className={styles.bgImage}>
                    <Image src='/images/signup_image1.png' alt="Background" className={styles.image1} width={500} height={500} />
                    <Image src='/images/signup_image2.png' alt="Background" className={styles.image2} width={500} height={500} />
                </section>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>Create Account</h2>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input type="text" id="username" 
                               className={styles.input} 
                               value={username}
                               placeholder="username"
                               onChange={(e) => setUsername(e.target.value)} 
                               required />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input type="email" id="email" 
                               className={styles.input} 
                               value={email}
                               placeholder="username@gmail.com"
                               onChange={(e) => setEmail(e.target.value)} 
                               required />
                    </div>

                    <div className={styles.passwordContainer}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <div className={styles.passwordContainer}>
                            <input type={showPassword ? "text" : "password"} id="password" 
                                   className={styles.input} 
                                   value={password}
                                   placeholder="password"
                                   onChange={(e) => setPassword(e.target.value)} 
                                   required />
                            <span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className={styles.passwordContainer}>
                        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                        <div className={styles.passwordContainer}>
                            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" 
                                   className={styles.input} 
                                   value={confirmPassword}
                                   placeholder="confirm password"
                                   onChange={(e) => setConfirmPassword(e.target.value)} 
                                   required />
                            <span onClick={toggleConfirmPasswordVisibility} className={styles.eyeIcon}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {password !== confirmPassword && confirmPassword && (
                            <p className={styles.error}>Passwords do not match</p>
                        )}
                    </div>

                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                    <div className={styles.buttonContainer}>
                        <button 
                            type="submit"
                            className={styles.button} 
                            disabled={loading || password !== confirmPassword}
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </div>

                    <p style={{color: "#333333", fontWeight: "bold", fontSize: "14px", textAlign: "center", marginTop: "10px"}}> or Continue with </p>

                    <section className={styles.socialMedia}>
                        <a href="https://www.gmail.com" className={styles.socialButton} target="_blank"><FcGoogle /></a>
                        <a href="https://www.facebook.com" className={styles.socialButton} target="_blank"><ImFacebook /></a>
                    </section>

                    <p style={{color: "#333333", paddingTop: "20px"}}> Already have an account? <a href="./login" className={styles.link} >Login now</a> </p>
                </form>
            </section>
        </main>
    );
}

export default Signup;
