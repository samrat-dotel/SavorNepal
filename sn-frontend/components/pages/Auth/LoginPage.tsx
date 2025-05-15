"use client";

import React, { useState } from 'react';
import styles from './Login.module.css';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle} from 'react-icons/fc';
import { ImFacebook } from 'react-icons/im';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/api/login', {
            email,
            password
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('Login successful:', response.data);

        // Save token and user in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // 👈 ADD THIS LINE

        // Redirect to homepage
        window.location.href = '/';

    } catch (err) {
        setError('Invalid email or password');
        if (axios.isAxiosError(err)) {
            console.error('Error during login:', err.response?.data || err.message);
        } else {
            console.error('Error during login:', err);
        }
    }
};
    return (
        <main className={styles.main}>

            <section className={styles.bgImage}>
                <Image src='/images/fox_login.png' alt="Background" width={850} height={850} />
            </section>

            <section className={styles.container}>

                <div className={styles.image}>
                    <Image src='/images/fox_login.png' alt="Login" width={500} height={500} />
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>Login</h2>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input type="email" id="email" 
                        className={styles.input} 
                        value={email}
                        placeholder= "username@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    </div>

                    <div className={styles.inputContainer}>
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

                    <a href='./forgetpassword' className={styles.forgotPassword}> Forgot password? </a>

                    {error && <p style={{color: 'red', fontSize: '14px'}}>{error}</p>}

                    <div className={styles.buttonContainer}>
                        <button className={styles.buttonSubmit}>Login</button>

                    <p style={{color: "#333333", fontWeight: "bold", fontSize: "14px"}}> or Continue with </p>

                    <section className={styles.socialMedia}>
                    <a href="http://localhost:3001/auth/google" className={styles.socialButton}>
                    <FcGoogle />
                    </a>
                    <a href="http://localhost:3001/auth/facebook" className={styles.socialButton}>
                    <ImFacebook />
                    </a>
                    </section>

                    <p style={{color: "#333333", paddingTop: "20px"}}> Don&apos;t have an account? <a href="./signup" className={styles.link} >Register now</a> </p>
                    </div>
                </form>
            </section>

        </main>
    )
}

export default Login;
