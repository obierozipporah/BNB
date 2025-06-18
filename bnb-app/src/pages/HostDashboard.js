// src/pages/HostDashboard.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore';
import './HostDashboard.css';

function HostDashboard() {
  const [pendingReservations, setPendingReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);

  // Listen for pending reservations in real-time
  useEffect(() => {
    const q = query(collection(db, "reservations"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reservations = [];
      querySnapshot.forEach((doc) => {
        reservations.push({ id: doc.id, ...doc.data() });
      });
      setPendingReservations(reservations);
    });
    return () => unsubscribe();
  }, []);
  
  // Listen for confirmed reservations
  useEffect(() => {
    const q = query(collection(db, "reservations"), where("status", "==", "confirmed"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reservations = [];
      querySnapshot.forEach((doc) => {
        reservations.push({ id: doc.id, ...doc.data() });
      });
      setConfirmedReservations(reservations);
    });
    return () => unsubscribe();
  }, []);

  const handleConfirmReservation = async (reservationId) => {
    const reservationRef = doc(db, "reservations", reservationId);
    try {
      await updateDoc(reservationRef, {
        status: "confirmed"
      });
      console.log("Reservation confirmed!");
    } catch (error) {
      console.error("Error confirming reservation: ", error);
    }
  };

  return (
    <div className="host-dashboard section-padding">
      <h1>Host Dashboard</h1>
      
      <div className="dashboard-section">
        <h2>Pending Confirmation ({pendingReservations.length})</h2>
        {pendingReservations.length === 0 ? (
          <p>No new reservation requests.</p>
        ) : (
          pendingReservations.map(res => (
            <div key={res.id} className="reservation-card pending">
              <p><strong>Guest:</strong> {res.userEmail}</p>
              <p><strong>Check-in:</strong> {res.checkInDate}</p>
              <p><strong>Check-out:</strong> {res.checkOutDate}</p>
              <p><strong>Wishlist:</strong> {res.wishlist || 'None'}</p>
              <button onClick={() => handleConfirmReservation(res.id)} className="confirm-button">Confirm Booking</button>
            </div>
          ))
        )}
      </div>

      <div className="dashboard-section">
        <h2>Confirmed Reservations ({confirmedReservations.length})</h2>
        {confirmedReservations.map(res => (
           <div key={res.id} className="reservation-card confirmed">
             <p><strong>Guest:</strong> {res.userEmail}</p>
             <p><strong>Dates:</strong> {res.checkInDate} to {res.checkOutDate}</p>
           </div>
        ))}
      </div>
    </div>
  );
}

export default HostDashboard;