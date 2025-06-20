import React, { useState, useEffect } from 'react';
import './CalendarModal.css';

// Simple Chevron Icons for month navigation
const ChevronLeftIcon = () => <svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const ChevronRightIcon = () => <svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>;

// NEW: Destructure the bookedDates prop with a default empty array
const CalendarModal = ({ isOpen, onClose, onDateSelect, initialDateStr, bookedDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (initialDateStr && initialDateStr !== 'DD/MM/YYYY') {
      const parts = initialDateStr.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          setCurrentMonth(month);
          setCurrentYear(year);
          setSelectedDay(day);
        }
      }
    } else {
      const today = new Date();
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());
      setSelectedDay(null);
    }
  }, [initialDateStr, isOpen]);


  if (!isOpen) return null;

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // NEW: Updated renderDays function
  const renderDays = () => {
    const days = [];
    const numDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= numDays; day++) {
      // Format the date string to match the format stored in Firestore (DD/MM/YYYY)
      const fullDateStr = `${String(day).padStart(2, '0')}/${String(currentMonth + 1).padStart(2, '0')}/${currentYear}`;
      const isBooked = bookedDates.includes(fullDateStr);

      days.push(
        <div
          key={day}
          // Apply 'booked' class if the date is in the bookedDates array
          className={`calendar-day ${selectedDay === day ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
          // Disable the onClick handler if the date is booked
          onClick={() => !isBooked && setSelectedDay(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
    if (currentMonth === 0) setCurrentYear(prev => prev - 1);
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
    if (currentMonth === 11) setCurrentYear(prev => prev + 1);
    setSelectedDay(null);
  };

  const handleDone = () => {
    if (selectedDay) {
      const formattedDate = `${String(selectedDay).padStart(2, '0')}/${String(currentMonth + 1).padStart(2, '0')}/${currentYear}`;
      onDateSelect(formattedDate);
    }
    onClose();
  };

  return (
    <div className="calendar-modal-overlay">
      <div className="calendar-modal-content">
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="month-nav-button"><ChevronLeftIcon /></button>
          <span>{monthNames[currentMonth]} {currentYear}</span>
          <button onClick={handleNextMonth} className="month-nav-button"><ChevronRightIcon /></button>
        </div>
        <div className="calendar-days-header">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="calendar-grid">
          {renderDays()}
        </div>
        <div className="calendar-footer">
          <button onClick={onClose} className="calendar-button cancel">Cancel</button>
          <button onClick={handleDone} className="calendar-button done">Done</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;