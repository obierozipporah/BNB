// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';
import { account, databases } from '../appwrite'; // Import Appwrite services
import { ID } from 'appwrite';

// IMPORTANT: Get these IDs from your Appwrite Console
const DATABASE_ID = 'YOUR_BNB_DATABASE_ID';
const USERS_COLLECTION_ID = 'YOUR_USERS_COLLECTION_ID';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Create the user account in Appwrite Auth
      const user = await account.create(ID.unique(), email, password, name);

      // 2. Create a corresponding document in your 'users' collection
      await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        user.$id, // Use the new user's ID as the document ID
        { name, email }
      );

      // 3. Log the user in by creating a session
      await account.createEmailSession(email, password);

      console.log('Account created and user logged in!');
      navigate('/make-reservation'); // Redirect to the authenticated reservation page

    } catch (err) {
      console.error("Error signing up with Appwrite:", err);
      setError(err.message || 'Failed to create an account. Please try again.');
    }
  };

  return (
    // ... Your existing SignUpPage JSX form ...
    <div className="auth-page-container section-padding">
      <div className="auth-form-container">
        <h1 className="auth-title">Create Your Birne's BNB Account</h1>
        {error && <p className="auth-error-message">{error}</p>}
        <form onSubmit={handleSignUp} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="button-primary auth-button">Create Account</button>
        </form>
        <p className="auth-switch-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
