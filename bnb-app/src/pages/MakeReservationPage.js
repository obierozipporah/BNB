// src/pages/MakeReservationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarModal from '../components/booking/CalendarModal';
import './MakeReservationPage.css';
import { account, databases } from '../appwrite'; // Import Appwrite services
import { ID } from 'appwrite';

// IMPORTANT: Get these IDs from your Appwrite Console
const DATABASE_ID = 'YOUR_BNB_DATABASE_ID';
const RESERVATIONS_COLLECTION_ID = 'YOUR_RESERVATIONS_COLLECTION_ID';

function MakeReservationPage() {
  // ... (all your existing useState hooks for the form) ...
  const [currentUser, setCurrentUser] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const [checkInDate, setCheckInDate] = useState('');
const [checkOutDate, setCheckOutDate] = useState('');
const [adults, setAdults] = useState(1);
const [children, setChildren] = useState(0);
const [infants, setInfants] = useState(0);
const [wishlist, setWishlist] = useState([]);

  
  const navigate = useNavigate();

  // Check if user is logged in & get user info
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        setCurrentUser(user);
      } catch (error) {
        navigate('/login'); // Redirect if not authenticated
      }
    };
    checkAuth();
  }, [navigate]);

  // Listen for real-time updates on confirmed reservations
  useEffect(() => {
    // Appwrite Realtime subscription path
    const subscriptionPath = `databases.${DATABASE_ID}.collections.${RESERVATIONS_COLLECTION_ID}.documents`;
    
    const unsubscribe = databases.client.subscribe(subscriptionPath, response => {
      // This callback fires for every create, update, delete event
      console.log('Realtime event received:', response);
      // For simplicity, we refetch all booked dates on any change.
      // A more advanced implementation would look at response.payload to see what changed.
      fetchBookedDates();
    });

    const fetchBookedDates = async () => {
        try {
            // Fetch all confirmed reservations
            const result = await databases.listDocuments(DATABASE_ID, RESERVATIONS_COLLECTION_ID /*, [Query.equal('status', 'confirmed')] */); // Add query when permissions allow
            const dates = [];
            result.documents.forEach(doc => {
                // Here, you'd generate all dates in the range from checkInDate to checkOutDate
                // For now, just blocking check-in date for simplicity
                dates.push(doc.checkInDate); 
            });
            setBookedDates(dates);
        } catch (error) {
            console.error("Failed to fetch booked dates:", error);
        }
    };

    fetchBookedDates(); // Fetch initial dates

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  const handleMakeReservation = async (e) => {
    e.preventDefault();
    if (!currentUser) { /* ... error handling ... */ return; }
    
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      await databases.createDocument(
        DATABASE_ID,
        RESERVATIONS_COLLECTION_ID,
        ID.unique(),
        {
          userId: currentUser.$id,
          userEmail: currentUser.email,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          guests: JSON.stringify({ adults, children, infants }), // Store object as JSON string
          wishlist: wishlist,
          status: 'pending',
        }
      );
      setSubmitMessage({ type: 'success', text: 'Your reservation request has been sent!' });
    } catch (error) {
      console.error("Error creating reservation:", error);
      setSubmitMessage({ type: 'error', text: 'Failed to send reservation request.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (rest of your component: openCalendar, handleDateSelect, JSX, etc.) ...
  return (
    <div className="reservation-page-container section-padding">
      <div className="reservation-form-wrapper">
        <h1 className="reservation-title">Welcome, {currentUser ? currentUser.name : 'Guest'}!</h1>
        {/* ... The rest of your form JSX ... */}
        <button type="submit" onClick={handleMakeReservation} className="button-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Confirm Reservation'}
        </button>
      </div>
      <CalendarModal bookedDates={bookedDates} /* ... other props ... */ />
    </div>
  );
}

export default MakeReservationPage;