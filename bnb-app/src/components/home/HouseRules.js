// src/components/home/HouseRules.js
import React from 'react';
import './HouseRules.css';
// Import appropriate icons from react-icons
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Example icons

function HouseRules({ rules }) {
  if (!rules) return null;

  return (
    <section className="house-rules-section">
      <h4 className="rules-main-title">House Rules</h4>
      <div className="rule-item">
        <div className="rule-icon-container">
          <FaSignInAlt /> {/* Icon for Check In */}
        </div>
        <p className="rule-text">{rules.checkIn}</p>
      </div>
      <div className="rule-item">
        <div className="rule-icon-container">
          <FaSignOutAlt /> {/* Icon for Check Out */}
        </div>
        <p className="rule-text">{rules.checkOut}</p>
      </div>
      {rules.note && <p className="rules-note">{rules.note}</p>}
    </section>
  );
}

export default HouseRules;