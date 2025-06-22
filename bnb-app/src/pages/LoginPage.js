import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './AuthPages.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we were sent from another page, otherwise default to the homepage.
    const from = location.state?.from || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed.');
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Navigate to the 'from' page we saved earlier
            navigate(from, { replace: true });

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Log In</h2>
                {from.includes('reservation') && <p className="redirect-message">Please log in to continue your booking.</p>}
                
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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