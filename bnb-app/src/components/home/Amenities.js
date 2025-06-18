// src/components/home/Amenities.js
import React from 'react';
import './Amenities.css';

// Import desired icons from react-icons/fa (Font Awesome)
import {
  FaWifi,
  FaTv,
  FaUtensils,       // For Kitchen
  FaCouch,          // For Livingroom/Sofa
  FaBed,
  FaBath,           // For Bed linens & towels
  FaShower,
  FaTint,           // For Clean water (droplet)
  FaCar,            // For Parking
  FaSwimmingPool,
  FaTree,           // For Scenic views
  FaShieldAlt,      // For Security
  FaQuestionCircle  // Optional: A default icon for unmatched cases
} from 'react-icons/fa';

// Helper component to render the correct react-icon
const AmenityIcon = ({ iconName }) => {
  // The 'size' and 'color' for react-icons are often controlled by CSS (font-size, color)
  // on the icon's container or the icon itself, or via a size prop.
  // We will rely on CSS styling of .amenity-icon-container for this.

  switch (iconName) {
    case 'wifi':
      return <FaWifi />;
    case 'tv':
      return <FaTv />;
    case 'kitchen':
      return <FaUtensils />;
    case 'sofa': // Assuming your data uses 'sofa' for Furnished Livingroom
      return <FaCouch />;
    case 'bed':
      return <FaBed />;
    case 'bath': // For Bed linens & towels
      return <FaBath />;
    case 'shower':
      return <FaShower />;
    case 'water':
      return <FaTint />;
    case 'parking':
      return <FaCar />;
    case 'pool':
      return <FaSwimmingPool />;
    case 'tree': // For Scenic views
      return <FaTree />;
    case 'security':
      return <FaShieldAlt />;
    default:
      return <FaQuestionCircle />; // Default icon if no match
  }
};

function Amenities({ amenities }) {
  if (!amenities || amenities.length === 0) {
    return (
      <section className="amenities-section section-padding">
        <h3 className="amenities-title">What our place offers</h3>
        <p className="amenities-unavailable-message">
          Currently, information about our amenities is not available.
        </p>
      </section>
    );
  }

  return (
    <section className="amenities-section">
      <h3 className="amenities-title">What our place offers</h3>
      <div className="amenities-grid">
        {amenities.map((amenity, index) => (
          <div key={index} className="amenity-item">
            <div className="amenity-icon-container">
              {/* Pass the icon string from your data to AmenityIcon */}
              <AmenityIcon iconName={amenity.icon} />
            </div>
            <span className="amenity-text">{amenity.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Amenities;