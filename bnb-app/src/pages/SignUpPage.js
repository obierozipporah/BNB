import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';
// We are keeping the Appwrite import for now, but not using it in the test
import { account, databases } from '../appwrite';
import { ID } from 'appwrite';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // This is the simplified test function
  const handleSignUp = (e) => {
    e.preventDefault();
    
    // --- THE ONLY THING THIS FUNCTION WILL DO ---
    // If you see this alert, the button and form are working correctly.
    alert('Sign Up button click was successful!');
    console.log('Sign up form submitted with:', { name, email, password });
  };

  return (
    <div className="auth-page-container section-padding">
      <div className="auth-form-container">
        <h1 className="auth-title">Create Your Birne's BNB Account</h1>
        
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