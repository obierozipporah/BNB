import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Use curly braces {} to import by name
import { account, databases } from '../appwrite'; 
import { ID } from 'appwrite';
import './MakeReservationPage.css'; // Your specific styling

function MakeReservationPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    // ---- IMPORTANT ----
    // Replace these with your actual IDs from the Appwrite console
    const DATABASE_ID = '667417e9003b302c1164'; // Replace with your actual Database ID
    const RESERVATIONS_COLLECTION_ID = '667417fe0030588f98d0'; // Replace with your actual 'reservations' Collection ID

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Use the account service directly
                const user = await account.get();
                setCurrentUser(user);
            } catch (e) {
                setError('You must be logged in to make a reservation.');
                console.error("Failed to get user:", e);
                // Optional: redirect to login page after a delay
                // setTimeout(() => navigate('/login'), 3000);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleReservation = async (e) => {
        e.preventDefault();
        setError('');

        if (!currentUser) {
            setError('Please log in before making a reservation.');
            return;
        }

        if (!DATABASE_ID || !RESERVATIONS_COLLECTION_ID || DATABASE_ID.includes('YOUR_')) {
            setError("Developer error: Database or Collection ID is not set. Please check the code.");
            return;
        }

        // TODO: Get these values from your form state
        const reservationData = {
            userId: currentUser.$id,
            userEmail: currentUser.email,
            checkInDate: '2025-08-01',
            checkOutDate: '2025-08-05',
            guests: JSON.stringify({ adults: 2, children: 1 }),
            status: 'pending',
        };

        try {
            // Use the databases service directly
            await databases.createDocument(
                DATABASE_ID,
                RESERVATIONS_COLLECTION_ID,
                ID.unique(),
                reservationData
            );
            alert('Reservation request sent successfully!');
            navigate('/dashboard'); // Navigate to a dashboard or confirmation page

        } catch (err) {
            console.error("Reservation failed:", err);
            setError('Could not submit your reservation. Please try again later.');
        }
    };

    return (
        <div className="reservation-page-container">
            <div className="reservation-card">
                <h1>Make a Reservation</h1>
                <p>Confirm the details for your upcoming stay.</p>
                <form onSubmit={handleReservation}>
                    {/* Your form fields for check-in date, check-out date,
                        and number of guests will go here.
                    */}
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="auth-button" disabled={!currentUser}>
                        Request to Book
                    </button>
                    {!currentUser && <p>Please log in to enable booking.</p>}
                </form>
            </div>
        </div>
    );
}

export default MakeReservationPage;