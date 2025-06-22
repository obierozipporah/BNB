import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingSection.css';

function BookingSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // This hook checks if a user is logged in by looking in localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleBookNowClick = () => {
    if (isLoggedIn) {
      // If user is logged in, go directly to make the reservation
      navigate('/make-reservation');
    } else {
      // If user is NOT logged in, redirect them to the login page
      // and pass the destination page in the 'state' object.
      alert('You must log in to make a booking.');
      navigate('/login', { state: { from: '/make-reservation' } });
    }
  };

  return (
    <div className="booking-section-container">
      <h2>Ready to book your stay?</h2>
      <p>Check availability and secure your spot at Birne's BNB.</p>
      <button onClick={handleBookNowClick} className="book-now-button">
        Book Now
      </button>
    </div>
  );
}

export default BookingSection;