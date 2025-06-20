import React from 'react';
// Import Components needed for HomePage
import Header from '../components/common/Header';
import HeroSection from '../components/home/HeroSection';
import ListingDetails from '../components/home/ListingDetails';
import Amenities from '../components/home/Amenities';
/*import BookingSection from '../components/home/BookingSection';*/
import HostProfile from '../components/home/HostProfile';
import HouseRules from '../components/home/HouseRules';
import StayGuidelines from '../components/home/StayGuidelines';
import DepartureGuidelines from '../components/home/DepartureGuidelines';
import ContactInformation from '../components/common/ContactInformation';

// Import Assets (ensure these paths are correct and images exist)
import heroImage from '../assets/hero-image.jpg';
import mainListingImage from '../assets/listing-main.jpg';
import thumb1 from '../assets/thumb1.jpg';
import thumb2 from '../assets/thumb2.jpg';
import thumb3 from '../assets/thumb3.jpg';
import thumb4 from '../assets/thumb4.jpg';
import hostImageDetailed from '../assets/host-image-detailed.jpg';


function HomePage() {
  // Mock data for the entire page (same as before)
  const pageData = {
    listing: {
      title: 'One Bedroom apartment at Tsavo apartments',
      location: 'Omgata Rongai, Kenya.',
      description: "Birne's is a charming getaway nestled in the peaceful Tsavo apartment locted in Rongai. This cozy retreat features a serene swimming pool, a spacious sundeck, and a delight gazibo, perfect for families and travelers seeking relaxation and comfort.",
      mainImage: mainListingImage,
      thumbnails: [thumb1, thumb2, thumb3, thumb4],
      price: 'KES 3000/-',
    },
    amenitiesList: [
      { icon: 'wifi', text: 'Wifi' }, { icon: 'tv', text: '42" Television' },
      { icon: 'kitchen', text: 'Furnished kitchen' }, { icon: 'sofa', text: 'Furnished Livingroom' },
      { icon: 'bed', text: 'Furnished bedroom' }, { icon: 'bath', text: 'Bed linens & towels' },
      { icon: 'shower', text: 'Hot shower' }, { icon: 'water', text: 'Clean water' },
      { icon: 'parking', text: 'Ample parking' }, { icon: 'pool', text: 'Outdoor pool' },
      { icon: 'tree', text: 'Scenic views' }, { icon: 'security', text: '24 hour security' },
    ],
    hostInfo: {
      name: 'MARVIN OCHIENG\'',
      image: hostImageDetailed,
      quote: "At Birne's, we dont just offer a place to stay--we offer a place to belong. Every guest is welcomed as family, and every stay is crafted to feel like home.",
    },
    houseRules: {
      checkIn: 'Check in at 12:00 PM',
      checkOut: 'Check out before 11:00 AM',
      note: 'NOTE: In any case if you want to arrive earlier or depart later than the mentioned hours feel free to reach out to your on-call host by tapping on the contact info of the host.',
    },
    stayGuidelines: [{ icon: 'camera', text: 'Photography allowed' }],
    departureGuidelines: [
      { icon: 'towel', text: 'Gather used towels' }, { icon: 'trash', text: 'Dispose of the trash' },
      { icon: 'power', text: 'Turn off devices and equipment' }, { icon: 'lock', text: 'Lock up' },
      { icon: 'key', text: 'Return keys' },
    ],
    departureNote: "NOTE: Please leave the house in a good state condition as you found it.",
    contactInfo: {
      phone: '0727321240 - Marvin',
      whatsapp: '072732124 - Marvin',
    },
    heroImage: heroImage,
  };

  return (
    <> {/* Use Fragment as App.js now provides the main .app-container div */}
      <Header /> {/* Header specific to homepage */}
      <HeroSection image={pageData.heroImage} />
      <main className="content-wrapper">
        <div className="listing-section-bg">
          <ListingDetails listing={pageData.listing} />
        </div>
        <Amenities amenities={pageData.amenitiesList} />
      </main>


      <main className="content-wrapper additional-info-bg">
        <HostProfile host={pageData.hostInfo} />
        <HouseRules rules={pageData.houseRules} />
        <StayGuidelines guidelines={pageData.stayGuidelines} title="During your stay" />
        <DepartureGuidelines
          guidelines={pageData.departureGuidelines}
          note={pageData.departureNote}
          title="Before you leave"
        />
      </main>
      <ContactInformation contacts={pageData.contactInfo} />
    </>
  );
}

export default HomePage;