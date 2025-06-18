import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link might be used for individual listing details later
import './ListingsPage.css';

// Assuming LoadingSpinner is in App.js and exported, or move it to a common component
// For this self-contained example, let's define a simple one here or assume it's globally available.
const LoadingSpinner = ({ message = "Loading..." }) => (
    <div className="page-loading-message section-padding" style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
      {/* Basic text spinner, replace with actual spinner if available */}
      <div className="simple-spinner"></div>
      <p>{message}</p>
      <style>{`
        .simple-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #000;
          animation: spin 1s ease infinite;
          margin: 0 auto 15px auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );


// Define the path to your default placeholder image in the public folder
const DEFAULT_PLACEHOLDER_IMAGE_URL = process.env.PUBLIC_URL + '/assets/default-placeholder.png';

// Mock Data for Listings (Ensure image paths are correct for your public folder)
const initialMockListings = [
  {
    id: 'tsavo-01',
    title: 'Tsavo Apartment - Ongata Rongai',
    location: 'Ongata Rongai, Kajiado County',
    pricePerNight: 2500,
    image: process.env.PUBLIC_URL + '/assets/listings/tsavo-apartment-exterior.jpg', // Example valid path
    rating: 4.7,
    reviews: 102,
    shortDescription: 'Charming 1BR with pool, sundeck, and delightful gazebo. Perfect for relaxation.',
    bedrooms: 1, beds: 1, baths: 1, guests: 2,
  },
  {
    id: 'karen-02',
    title: 'Serene Studio in Karen',
    location: 'Karen, Nairobi',
    pricePerNight: 3500,
    image: process.env.PUBLIC_URL + '/assets/listings/serene-studio-karen.jpg', // Example valid path
    rating: 4.9,
    reviews: 75,
    shortDescription: 'Peaceful getaway with modern amenities and lush garden surroundings.',
    bedrooms: 0, beds: 1, baths: 1, guests: 2,
  },
  {
    id: 'city-03',
    title: 'City View Penthouse, Upper Hill',
    location: 'Upper Hill, Nairobi',
    pricePerNight: 7000,
    image: process.env.PUBLIC_URL + '/assets/listings/non-existent-image.jpg', // INTENTIONALLY BROKEN PATH
    rating: 4.8,
    reviews: 40,
    shortDescription: 'Luxurious stay with breathtaking city views and premium comforts.',
    bedrooms: 2, beds: 2, baths: 2, guests: 4,
  },
  {
    id: 'coast-04',
    title: 'Diani Beachfront Villa',
    location: 'Diani Beach, Kwale County',
    pricePerNight: 12000,
    image: null, // NULL SRC to test placeholder for initially bad src
    rating: 5.0,
    reviews: 98,
    shortDescription: 'Stunning villa right on the beach, private pool, and staff.',
    bedrooms: 3, beds: 4, baths: 3, guests: 6,
  },
];

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        // Simulate API call for listings
        // In a real app, you'd fetch this data:
        // const response = await fetch('http://localhost:5002/api/listings');
        // if (!response.ok) throw new Error('Failed to fetch listings');
        // const data = await response.json();
        // setListings(data.map(listing => ({...listing, image: listing.image ? process.env.PUBLIC_URL + listing.image : null })));
        
        // Using mock data for now, simulating API delay
        await new Promise(resolve => setTimeout(resolve, 700));
        setListings(initialMockListings); // Directly use the mock data with full paths
        setError(null);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError(err.message);
        setListings([]); // Clear listings on error
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleImageError = (event) => {
    event.target.onerror = null; // Prevents future errors on this element if placeholder also fails
    event.target.src = DEFAULT_PLACEHOLDER_IMAGE_URL;
    event.target.classList.add('image-fell-back'); // Optional: for styling the placeholder state
  };

  const handleBookNow = (listingId, listingTitle) => {
    // Navigate to booking page, potentially passing some listing info
    // BookingInquiryPage would need to be updated to use location.state
    navigate('/booking', { state: { selectedListingId: listingId, listingTitle: listingTitle } });
  };

  if (loading) {
    return <LoadingSpinner message="Fetching available listings..." />;
  }

  if (error) {
    return <div className="page-error-message section-padding">Error loading listings: {error}. Please try again.</div>;
  }

  return (
    <div className="listings-page-container section-padding"> {/* section-padding is a global class */}
      <h1 className="listings-page-title">Our Apartments</h1>
      <p className="listings-page-subtitle">Find the perfect place for your stay in Kenya.</p>
      
      {listings.length > 0 ? (
        <div className="listings-grid">
          {listings.map(listing => (
            <div key={listing.id} className="listing-card">
              <img 
                src={listing.image || DEFAULT_PLACEHOLDER_IMAGE_URL} // Use placeholder if src is initially null/undefined/empty
                alt={listing.title || "Apartment listing image"} 
                className="listing-card-image"
                onError={handleImageError} // Add the onError handler here
              />
              <div className="listing-card-content">
                <h3 className="listing-card-title">{listing.title}</h3>
                {listing.location && (
                  <p className="listing-card-location">
                    {/* Location icon removed */}
                    {listing.location}
                  </p>
                )}
                <div className="listing-card-info-bar">
                  <span className="listing-card-guests">{listing.guests} guests</span>
                  <span className="listing-card-bedrooms">{listing.bedrooms > 0 ? `${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''}` : 'Studio'}</span>
                  <span className="listing-card-beds">{listing.beds} bed{listing.beds > 1 ? 's' : ''}</span>
                </div>
                <div className="listing-card-price-rating">
                  <p className="listing-card-price">
                    <strong>Ksh {listing.pricePerNight}</strong> / night
                  </p>
                  {listing.rating && (
                    <div className="listing-card-rating">
                      {/* Star icon removed */}
                      {listing.rating.toFixed(1)} 
                      {listing.reviews && <span className="listing-reviews"> ({listing.reviews} reviews)</span>}
                    </div>
                  )}
                </div>
                {/* If you have individual detail pages for listings in the future:
                  <Link 
                    to={`/listings/${listing.id}`} 
                    className="button-secondary listing-card-button" // Using global button style
                    style={{marginTop: 'auto'}} // Push button to bottom
                  >
                    View Details
                  </Link>
                */}
                <button 
                  onClick={() => handleBookNow(listing.id, listing.title)}
                  className="button-primary listing-card-button" // Using global button style
                  style={{marginTop: 'auto'}} // Push button to bottom
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="listings-empty-message">No listings currently available. Please check back later.</p>
      )}
    </div>
  );
}

export default ListingsPage;