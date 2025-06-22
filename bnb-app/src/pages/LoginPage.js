import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
// Use curly braces {} to import the 'account' service by name
import { account } from '../appwrite'; 
import './AuthPages.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    // Determine where to send the user after login.
    // It will check if we were redirected from another page, otherwise default to '/'
    const from = location.state?.from || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await account.createEmailSession(email, password);
            
            // On success, navigate to the page the user originally wanted, or the homepage.
            navigate(from, { replace: true });

        } catch (err) {
            console.error("Login failed:", err);
            setError('Login failed. Please check your email and password.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Log In</h2>
                {/* A helpful message if the user was redirected */}
                {from !== '/' && <p className="redirect-message">Please log in to continue to your reservation.</p>}
                
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="auth-button">Log In</button>
                </form>
                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;