import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles
import './MakeReservationPage.css';      // Custom calendar styles
import './AuthPages.css';                  // Re-use some form styles

function MakeReservationPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [bookedDates, setBookedDates] = useState([]);

    // Check if user is logged in by looking at localStorage
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            setUser(loggedInUser);
        } else {
            alert("You must be logged in to make a reservation.");
            navigate('/login', { state: { from: location.pathname } });
        }
    }, [navigate, location.pathname]);

    // Fetch confirmed reservations to disable dates on the calendar
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reservations');
                const reservations = await response.json();
                const disabledDates = [];
                reservations
                    .filter(res => res.status === 'confirmed')
                    .forEach(res => {
                        let currentDate = new Date(new Date(res.checkInDate).toISOString().slice(0, 10));
                        const endDate = new Date(new Date(res.checkOutDate).toISOString().slice(0, 10));
                        
                        while (currentDate <= endDate) {
                            disabledDates.push(new Date(currentDate));
                            currentDate.setDate(currentDate.getDate() + 1);
                        }
                    });
                setBookedDates(disabledDates);
            } catch (err) {
                console.error("Could not fetch booked dates:", err);
            }
        };
        fetchReservations();
    }, []);

    // Handle the reservation form submission
    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const reservationData = {
            userId: user.id,
            userEmail: user.email,
            checkInDate: dateRange[0].toISOString().split('T')[0],
            checkOutDate: dateRange[1].toISOString().split('T')[0],
            guests: "2 Adults", // This is an example, you can add form inputs for this
        };

        try {
            const response = await fetch('http://localhost:5000/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData),
            });
            if (!response.ok) throw new Error('Failed to send reservation request.');
            
            alert('Reservation request sent! The host will email you to confirm.');
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to pass to the calendar to disable certain dates
    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return bookedDates.some(bookedDate => 
                date.getFullYear() === bookedDate.getFullYear() &&
                date.getMonth() === bookedDate.getMonth() &&
                date.getDate() === bookedDate.getDate()
            );
        }
        return false;
    };

    return (
        <div className="reservation-page-container">
            <div className="reservation-card">
                <h1>Book Your Stay</h1>
                <p>Select your check-in and check-out dates on the calendar. Unavailable dates are greyed out.</p>
                <form onSubmit={handleReservationSubmit}>
                    <div className="calendar-container">
                        <Calendar
                            onChange={setDateRange}
                            value={dateRange}
                            selectRange={true}
                            minDate={new Date()}
                            tileDisabled={tileDisabled}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="reservation-button" disabled={!user}>
                        Request to Book
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MakeReservationPage;