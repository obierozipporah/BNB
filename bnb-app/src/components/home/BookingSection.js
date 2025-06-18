import React from 'react';
import './BookingSection.css';

function BookingSection({ price }) {
  return (
    <section className="booking-section">
      <div className="price-info">
        <span className="price-amount">{price}</span> per Night
      </div>
      <button className="book-now-button">BOOK NOW</button>
    </section>
  );
}

export default BookingSection;