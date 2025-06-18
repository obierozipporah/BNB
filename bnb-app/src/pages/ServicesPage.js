import React, { useState } from 'react';
import './ServicesPage.css';

import ServiceQuickLinks from '../components/services/ServicesQuickLinks';
import OrderFoodSection from '../components/services/OrderFoodSection';
import StayEasyServiceSection from '../components/services/StayEasyServiceSection';
import PlaceholderServiceSection from '../components/services/PlaceholderServiceSection';
// Assuming ContactInformation is a general footer, you might want it here too
// import ContactInformation from '../components/ContactInformation';


function ServicesPage() {
  const [activeService, setActiveService] = useState('orderFood'); // Default to 'orderFood'

  // Mock contact info, or fetch/pass as prop if it's dynamic
  const contactInfo = {
    phone: '0712345678 - Marvin',
    whatsapp: '0712345678 - Marvin',
    email: 'abcdefgh@gmail.com' // From menu2.jpg
  };


  const renderActiveService = () => {
    switch (activeService) {
      case 'orderFood':
        return <OrderFoodSection />;
      case 'stayEasy':
        return <StayEasyServiceSection />;
      case 'houseCleaning':
        return <PlaceholderServiceSection serviceName="House Cleaning" />;
      case 'laundry':
        return <PlaceholderServiceSection serviceName="Laundry Services" />;
      default:
        return <OrderFoodSection />;
    }
  };

  return (
    <div className="services-page">
      <ServiceQuickLinks activeService={activeService} setActiveService={setActiveService} />
      <div className="service-content-area">
        {renderActiveService()}
      </div>
      {/* Optional: If ContactInformation should always be at the bottom of services page */}
      {/* <ContactInformation contacts={contactInfo} /> */}
    </div>
  );
}

export default ServicesPage;