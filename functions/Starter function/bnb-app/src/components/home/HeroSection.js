// src/components/home/HeroSection.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './HeroSection.css';
// react-icons imports are removed as per previous request

function HeroSection({ image }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const heroImageStyle = {
    backgroundImage: `url(${image || process.env.PUBLIC_URL + '/assets/hero-image.jpg'})`
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Function to handle navigation for the Book Now button
  const handleBookNowClick = () => {
    navigate('/booking');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (event.target.closest('.explore-button-hero-dropdown') === null) {
          setIsDropdownOpen(false);
        }
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, dropdownRef]);

  return (
    <section className="hero-section" style={heroImageStyle}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="explore-dropdown-container" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="explore-button-hero-dropdown">
            EXPLORE
            <span className="explore-arrow-indicator">{isDropdownOpen ? '▲' : '▼'}</span>
          </button>
          {isDropdownOpen && (
            <div className="explore-dropdown-menu">
              <Link
                to="/services"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Services
              </Link>
            </div>
          )}
        </div>

        {/* "Book Now" is now a button that uses navigate */}
        <button onClick={handleBookNowClick} className="book-now-button-on-hero">
          Book Now
        </button>
      </div>
    </section>
  );
}
export default HeroSection;