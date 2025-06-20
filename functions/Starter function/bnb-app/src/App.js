// src/App.js
import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';

// Import all pages
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import BookingInquiryPage from './pages/BookingInquiryPage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';           // <-- NEW
import SignUpPage from './pages/SignUpPage';         // <-- NEW
import MakeReservationPage from './pages/MakeReservationPage'; // <-- NEW


// Common components and icons
import Header from './components/common/Header';
import ContactInformation from './components/common/ContactInformation';
import { FaExclamationTriangle } from 'react-icons/fa';


function App() {
  const location = useLocation();
  const siteContactInfo = {
    phone: '0712-345-678 (Birne\'s BNB)',
    whatsapp: '0712-345-678 (Birne\'s BNB)',
    email: 'contact@birnesbnb.co.ke'
  };
  // Only show the main header on the homepage.
  const showMainHeader = location.pathname === '/';

  return (
    <div className="app-overall-container">
      {showMainHeader && <Header />}
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/booking" element={<BookingInquiryPage />} />
          <Route path="/services" element={<ServicesPage />} />
    
          
          {/* --- NEW AUTHENTICATION & RESERVATION ROUTES --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/make-reservation" element={<MakeReservationPage />} />
          

           {/* Fallback for unknown routes */}
           <Route path="*" element={
            <div className="page-error-message section-padding">
              <FaExclamationTriangle size={40} style={{ marginBottom: '15px' }} />
              <h2>404 - Page Not Found</h2>
              <p>Sorry, the page you are looking for does not exist.</p>
              <Link to="/" className="button-primary" style={{marginTop: '20px'}}>Go to Homepage</Link>
            </div>
          } />
        </Routes>
      </main>
      <ContactInformation contacts={siteContactInfo} />
    </div>
  );
}
export default App;
