import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './ListingDetails.css';
// import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'; // Example for arrows

// If you decide to use image fallbacks later, you would import ImageWithFallback here
// import ImageWithFallback from '../common/ImageWithFallback';

function ListingDetails({ listing }) {
  // A basic check to prevent errors if listing prop is not yet available or incomplete
  // You might want a more sophisticated loading state or placeholder here if listing can be null/undefined initially
  if (!listing || !listing.title) { 
    // Still render the "OUR LISTING" link even if details are missing
    return (
      <section className="listing-details-section section-padding-placeholder">
        <Link to="/listings" className="listing-main-title-link">
          <h2 className="listing-title-main">OUR LISTING</h2>
        </Link>
        <p className="listing-unavailable-message">
          Details for this specific listing are currently unavailable. Please browse all listings.
        </p>
      </section>
    );
  }

  return (
    <section className="listing-details-section">
      {/* "OUR LISTING" heading is now a link */}
      <Link to="/listings" className="listing-main-title-link">
        <h2 className="listing-title-main">OUR LISTING</h2>
      </Link>
      
      <p className="listing-subtitle">
        {listing.title} 
        {listing.location && <span className="listing-location">{listing.location}</span>}
      </p>
      
      <div className="listing-gallery">
        {/* Current: using <img>. If using ImageWithFallback, replace here */}
        <img src={listing.mainImage} alt={listing.title || "Main listing"} className="main-image" />
        
        {/* Add arrow buttons for gallery navigation if needed */}
        {/* <button className="gallery-arrow left"><FaChevronLeft /></button> */}
        {/* <button className="gallery-arrow right"><FaChevronRight /></button> */}
        
        {listing.thumbnails && listing.thumbnails.length > 0 && (
          <div className="thumbnail-images">
            {listing.thumbnails.map((thumb, index) => (
              // Current: using <img>. If using ImageWithFallback, replace here
              <img 
                key={index} 
                src={thumb} 
                alt={`Thumbnail ${index + 1} for ${listing.title || 'listing'}`} 
                className="thumbnail" 
              />
            ))}
          </div>
        )}
      </div>
      <div className="listing-description-box">
        <h3 className="description-heading">Description</h3>
        <p className="description-text">{listing.description}</p>
      </div>
    </section>
  );
}

export default ListingDetails;