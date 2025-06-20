import React from 'react';
import './ServicesQuickLinks.css';

// Placeholder icons - replace with actual icons
const IconOrderFood = () => <span className="service-icon">🍴</span>; // Fork and Knife
const IconStayEasy = () => <span className="service-icon">🛒</span>; // Shopping Cart
const IconHouseCleaning = () => <span className="service-icon">🧹</span>; // Broom (or a person icon)
const IconLaundry = () => <span className="service-icon">🧺</span>; // Laundry Basket (or washing machine)

function ServiceQuickLinks({ activeService, setActiveService }) {
  const services = [
    { id: 'orderFood', label: 'Order Food', icon: <IconOrderFood /> },
    { id: 'stayEasy', label: 'Stay easy service', icon: <IconStayEasy /> },
    { id: 'houseCleaning', label: 'House cleaning', icon: <IconHouseCleaning /> },
    { id: 'laundry', label: 'Laundry services', icon: <IconLaundry /> },
  ];

  return (
    <div className="service-quick-links-container">
      <p className="quick-links-header">Feel free to access any of our services below:</p>
      <div className="quick-links-grid">
        {services.map(service => (
          <button
            key={service.id}
            className={`quick-link-button ${activeService === service.id ? 'active' : ''}`}
            onClick={() => setActiveService(service.id)}
          >
            {service.icon}
            <span>{service.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ServiceQuickLinks;