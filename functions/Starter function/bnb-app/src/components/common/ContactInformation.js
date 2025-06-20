// src/components/common/ContactInformation.js
import React from 'react';
import './ContactInformation.css'; // Make sure this CSS file is correctly linked

function ContactInformation({ contacts }) {
  // If no contacts data is passed, render a fallback or nothing
  if (!contacts || Object.keys(contacts).length === 0) {
    return (
      <footer className="contact-information-section contact-info-unavailable">
        <p className="contact-text">Contact information is currently unavailable.</p>
      </footer>
    );
  }

  // Filter out empty contact details to only render provided ones
  const availableContacts = Object.entries(contacts).filter(([key, value]) => value);

  if (availableContacts.length === 0) {
     return (
      <footer className="contact-information-section contact-info-unavailable">
        <p className="contact-text">Contact information is currently unavailable.</p>
      </footer>
    );
  }

  return (
    // Using the class name from your uploaded ContactInformation.css
    <footer className="contact-information-section">
      <h3 className="contact-main-title">CONTACT INFORMATION</h3>
      <div className="contact-items-wrapper"> {/* Added a wrapper for better layout if needed */}
        {contacts.phone && (
          <div className="contact-item">
            {/* Icon span removed */}
            <p className="contact-text">
              <a href={`tel:${contacts.phone.replace(/[^0-9+]/g, '')}`} className="contact-link">
                Phone: {contacts.phone}
              </a>
            </p>
          </div>
        )}
        {contacts.whatsapp && (
          <div className="contact-item">
            {/* Icon span removed */}
            <p className="contact-text">
              <a 
                href={`https://wa.me/${contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Laiser%20Place!`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                WhatsApp: {contacts.whatsapp}
              </a>
            </p>
          </div>
        )}
        {contacts.email && (
          <div className="contact-item">
            {/* Icon span removed */}
            <p className="contact-text">
              <a href={`mailto:${contacts.email}`} className="contact-link">
                Email: {contacts.email}
              </a>
            </p>
          </div>
        )}
        {/* Add other contact fields here if present in your data, e.g., address */}
      </div>
    </footer>
  );
}

export default ContactInformation;