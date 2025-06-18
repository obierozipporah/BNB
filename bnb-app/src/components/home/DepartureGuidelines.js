// src/components/home/DepartureGuidelines.js
import React from 'react';
import './Guidelines.css'; // Shared CSS

// Import icons from react-icons
import {
  FaShoppingBag, // For 'gather-items' like towels
  FaTrashAlt,
  FaPowerOff,
  FaLock,
  FaKey,
  FaQuestionCircle
} from 'react-icons/fa';

// Helper component to render the correct icon (can be shared if identical to StayGuidelines, or specific here)
const GuidelineIcon = ({ iconName }) => {
  switch (iconName) {
    case 'gather-items':
      return <FaShoppingBag />; // Example for gathering towels/items
    case 'trash':
      return <FaTrashAlt />;
    case 'power-off':
      return <FaPowerOff />;
    case 'lock':
      return <FaLock />;
    case 'key':
      return <FaKey />;
    default:
      return <FaQuestionCircle />; // Fallback icon
  }
};

function DepartureGuidelines({ guidelines, note, title }) {
  if (!guidelines || guidelines.length === 0) {
    return (
      <section className="guidelines-section section-padding departure-guidelines">
        <h4 className="guidelines-title">{title}</h4>
        <p className="guidelines-unavailable-message">No specific guidelines provided for this section.</p>
        {note && <p className="guidelines-note">{note}</p>}
      </section>
    );
  }

  return (
    <section className="guidelines-section departure-guidelines">
      <h4 className="guidelines-title">{title}</h4>
      {guidelines.map((item, index) => (
        <div key={index} className="guideline-item">
          <div className="guideline-icon-container">
            <GuidelineIcon iconName={item.icon} />
          </div>
          <p className="guideline-text">{item.text}</p>
        </div>
      ))}
      {note && <p className="guidelines-note">{note}</p>}
    </section>
  );
}

export default DepartureGuidelines;