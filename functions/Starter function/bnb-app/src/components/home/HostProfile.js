import React from 'react';
import './HostProfile.css';

// Assuming you might want to pass the entire host object
function HostProfile({ host }) {
  if (!host) return null; // Handle cases where host data might not be loaded

  return (
    <section className="host-profile-section">
      <h3 className="host-title">YOUR HOST</h3>
      <img src={host.image} alt={host.name || 'Host'} className="host-image" />
      {host.name && <p className="host-name">{host.name}</p>}
      {host.quote && (
        <div className="host-quote-container">
          <span className="quote-icon top-quote">“</span>
          <p className="host-quote">{host.quote}</p>
          {/* The image doesn't show a closing quote mark clearly, but you can add it if desired */}
          {/* <span className="quote-icon bottom-quote">”</span> */}
        </div>
      )}
    </section>
  );
}

export default HostProfile;