import React from 'react';
import './PlaceholderServiceSection.css';

function PlaceholderServiceSection({ serviceName }) {
  return (
    <div className="placeholder-service-section">
      <h2>{serviceName}</h2>
      <p>Details for {serviceName.toLowerCase()} will be available soon.</p>
      <p>You can contact us for more information.</p>
      {/* You can add a contact button or info here if needed */}
    </div>
  );
}

export default PlaceholderServiceSection;