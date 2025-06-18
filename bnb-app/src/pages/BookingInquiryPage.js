// src/pages/BookingInquiryPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookingInquiryPage.css';
import CalendarModal from '../components/booking/CalendarModal';

function BookingInquiryPage() {
  // State for the guest booking form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [idPassportNumber, setIdPassportNumber] = useState('');
  const [guestType, setGuestType] = useState('new');
  const [checkInDate, setCheckInDate] = useState('DD/MM/YYYY');
  const [checkOutDate, setCheckOutDate] = useState('DD/MM/YYYY');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [wishlist, setWishlist] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarTarget, setCalendarTarget] = useState(null);
  
  const handleReserveSubmitAsGuest = (e) => {
    e.preventDefault();
    console.log("Submitting GUEST Booking...");
    alert('Guest reservation request sent!');
  };

  const openCalendar = (target) => {
    setCalendarTarget(target);
    setIsCalendarOpen(true);
  };
  const handleDateSelect = (date) => {
    if (calendarTarget === 'checkin') setCheckInDate(date);
    else if (calendarTarget === 'checkout') setCheckOutDate(date);
  };
  const handleGuestCountChange = (setter, currentValue, operation, min = 0) => {
    if (operation === 'increment') setter(currentValue + 1);
    else if (operation === 'decrement' && currentValue > min) setter(currentValue - 1);
  };

  return (
    <div className="booking-inquiry-page-wrapper section-padding">
      <div className="auth-options-header">
        <h2 className="auth-options-title">Welcome to Birne's BNB</h2>
        <p>For a faster experience and to manage your bookings, please sign in or create an account.</p>
        <div className="auth-buttons-container">
          <Link to="/login" className="button-secondary auth-action-link">Sign In</Link>
          <Link to="/signup" className="button-primary auth-action-link">Create Account</Link>
        </div>
        <hr className="divider" />
        <p className="guest-booking-prompt">Or, continue below to book as a guest.</p>
      </div>

      <div className="booking-content-area guest-flow">
        <div className="booking-options-form-container">
          <h1 className="welcome-title">Book as a Guest</h1>
          <form onSubmit={handleReserveSubmitAsGuest}>
            <div className="guest-status-selector">
              <button type="button" className={`status-button ${guestType === 'existing' ? 'active' : ''}`} onClick={() => setGuestType('existing')}>
                I've been a guest before
              </button>
              <button type="button" className={`status-button ${guestType === 'new' ? 'active' : ''}`} onClick={() => setGuestType('new')}>
                I am a new guest
              </button>
            </div>
            
            <div className="date-selector">
              <div className="date-input-group" onClick={() => openCalendar('checkin')}>
                <label>Check In</label><span>{checkInDate}</span>
              </div>
              <div className="date-input-group" onClick={() => openCalendar('checkout')}>
                <label>Check Out</label><span>{checkOutDate}</span>
              </div>
            </div>

            <div className="guest-selection-section">{/* Guest counters... */}</div>
            <div className="wishlist-section">{/* Wishlist textarea... */}</div>
            
            <div className="guest-details-form-explicit">
                <h3 className="section-title guest-details-title">Your Details</h3>
                <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                <input type="text" placeholder="ID / Passport Number (Optional)" value={idPassportNumber} onChange={e => setIdPassportNumber(e.target.value)} />
                <input type="tel" placeholder="Phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
                <input type="email" placeholder="Email address" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} required/>
            </div>
            
            <button type="submit" className="main-action-button reserve">Reserve as Guest</button>
          </form>
        </div>
      </div>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
        initialDateStr={calendarTarget === 'checkin' ? checkInDate : checkOutDate}
      />
    </div>
  );
}
export default BookingInquiryPage;