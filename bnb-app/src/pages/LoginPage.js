// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';
import { account } from '../appwrite'; // Import Appwrite account service

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await account.createEmailSession(email, password);
      console.log('User signed in successfully!');
      navigate('/make-reservation'); // Redirect after successful login

    } catch (err) {
      console.error("Error signing in with Appwrite:", err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    // ... Your existing LoginPage JSX form ...
    <div className="auth-page-container section-padding">
      <div className="auth-form-container">
        <h1 className="auth-title">Sign In to Your Account</h1>
        {error && <p className="auth-error-message">{error}</p>}
        <form onSubmit={handleLogin} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="button-primary auth-button">Sign In</button>
        </form>
        <p className="auth-switch-link">
          New to Birne's BNB? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;