import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingSection.css';
// We need to check the user's login status here
import { account } from '../../appwrite';

const BookingSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check for a logged-in user when the component mounts
  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  const handleBookNowClick = () => {
    if (isLoggedIn) {
      // If the user is logged in, send them directly to the reservation page
      navigate('/make-reservation');
    } else {
      // If not logged in, send them to the login page
      // We pass state to tell the login page where to redirect back to.
      alert('You need to log in to make a reservation.');
      navigate('/login', { state: { from: '/make-reservation' } });
    }
  };

  return (
    <div className="booking-section">
      <h2>Ready to book your stay?</h2>
      <p>Check availability and secure your spot at Birne's BNB.</p>
      {/* This button now has smart logic */}
      <button onClick={handleBookNowClick} className="book-now-button">
        Book Now
      </button>
    </div>
  );
};

export default BookingSection;