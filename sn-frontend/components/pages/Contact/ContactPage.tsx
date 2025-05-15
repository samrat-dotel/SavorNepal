import React, { useState } from 'react';
import styles from './ContactPage.module.css';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <section className={styles.contactContainer}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>We&apos;d love to hear from you! Reach out with any questions, feedback, or ideas.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <MdLocationOn size={24} color="#D86436" />
            <p>Kathmandu, Nepal</p>
          </div>
          <div className={styles.infoItem}>
            <MdPhone size={24} color="#D86436" />
            <p>+977-9800000000</p>
          </div>
          <div className={styles.infoItem}>
            <MdEmail size={24} color="#D86436" />
            <p>contact@savornp.com</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
          {status && <p>{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
