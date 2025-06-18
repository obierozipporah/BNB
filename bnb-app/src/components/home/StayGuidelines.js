// src/components/home/StayGuidelines.js
import React from 'react';
import './Guidelines.css'; // Shared CSS

// Import icons from react-icons
import { FaCamera, FaQuestionCircle } from 'react-icons/fa'; // Add more as needed

// Helper component to render the correct icon
const GuidelineIcon = ({ iconName }) => {
  switch (iconName) {
    case 'camera':
      return <FaCamera />;
    // Add more cases here for other stay guideline icons
    // e.g., case 'no-pets': return <FaDogSlash />; (example)
    default:
      return <FaQuestionCircle />; // Fallback icon
  }
};

function StayGuidelines({ guidelines, title }) {
  if (!guidelines || guidelines.length === 0) {
    // Return a message or null if no guidelines are provided for this section
    return (
      <section className="guidelines-section section-padding">
        <h4 className="guidelines-title">{title}</h4>
        <p className="guidelines-unavailable-message">No specific guidelines provided for this section.</p>
      </section>
    );
  }

  return (
    <section className="guidelines-section">
      <h4 className="guidelines-title">{title}</h4>
      {guidelines.map((item, index) => (
        <div key={index} className="guideline-item">
          <div className="guideline-icon-container">
            <GuidelineIcon iconName={item.icon} />
          </div>
          <p className="guideline-text">{item.text}</p>
        </div>
      ))}
    </section>
  );
}

export default StayGuidelines;