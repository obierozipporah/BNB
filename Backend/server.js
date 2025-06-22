const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000; // Your backend runs on this port

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

// --- Database Configuration ---
const dbPath = path.join(__dirname, 'db.json');

const readDb = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// --- Email Transporter ---
// IMPORTANT: In a real app, use environment variables for these credentials!
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey', // This is always 'apikey' for SendGrid
        pass: 'YOUR_SENDGRID_API_KEY' // <-- REPLACE THIS
    }
});
const HOST_EMAIL = 'YOUR_HOST_EMAIL@example.com'; // <-- REPLACE THIS


// --- Auth Endpoints (Unchanged) ---
app.post('/api/signup', async (req, res) => { /* ...Your existing signup code... */ });
app.post('/api/login', async (req, res) => { /* ...Your existing login code... */ });


// ===================================
// --- RESERVATION WORKFLOW ROUTES ---
// ===================================

// GET /api/reservations - Fetches all reservations for the calendar
app.get('/api/reservations', (req, res) => {
    const db = readDb();
    res.status(200).json(db.reservations);
});

// POST /api/reservations - A client submits a booking request
app.post('/api/reservations', async (req, res) => {
    const db = readDb();
    const { userId, userEmail, checkInDate, checkOutDate, guests } = req.body;

    const newReservation = {
        id: `res_${Date.now()}`,
        status: 'pending',
        userId,
        userEmail,
        checkInDate,
        checkOutDate,
        guests
    };

    db.reservations.push(newReservation);
    writeDb(db);

    // Create unique confirmation and rejection links
    const confirmationLink = `http://localhost:${PORT}/api/reservations/manage?id=${newReservation.id}&action=confirm`;
    const rejectionLink = `http://localhost:${PORT}/api/reservations/manage?id=${newReservation.id}&action=reject`;

    // Send notification email to the host
    try {
        await transporter.sendMail({
            from: '"BNB Website" <noreply@yourbnb.com>',
            to: HOST_EMAIL,
            subject: `NEW Booking Request: ${checkInDate} to ${checkOutDate}`,
            html: `
                <h1>New Reservation Request</h1>
                <p><strong>Guest:</strong> ${userEmail}</p>
                <p><strong>Dates:</strong> ${checkInDate} to ${checkOutDate}</p>
                <p>Please confirm or reject this booking by clicking a link below:</p>
                <a href="${confirmationLink}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Booking</a>
                <a href="${rejectionLink}" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-left: 10px;">Reject Booking</a>
            `
        });
        console.log(`Reservation request from ${userEmail} sent to host.`);
        res.status(201).json(newReservation);
    } catch (emailError) {
        console.error("Failed to send reservation email:", emailError);
        res.status(500).json({ message: "Reservation saved, but failed to notify host." });
    }
});

// GET /api/reservations/manage - The endpoint the host clicks in the email
app.get('/api/reservations/manage', (req, res) => {
    const { id, action } = req.query;
    const db = readDb();
    
    const reservation = db.reservations.find(r => r.id === id);

    if (!reservation) {
        return res.status(404).send('<h1>Reservation Not Found</h1><p>This reservation may have already been handled.</p>');
    }

    if (action === 'confirm') {
        reservation.status = 'confirmed';
        writeDb(db);
        console.log(`Reservation ${id} confirmed by host.`);
        return res.send('<h1>Booking Confirmed!</h1><p>The reservation has been confirmed and the calendar has been updated.</p>');
    }
    
    if (action === 'reject') {
        reservation.status = 'rejected';
        writeDb(db);
        console.log(`Reservation ${id} rejected by host.`);
        return res.send('<h1>Booking Rejected</h1><p>The reservation has been rejected.</p>');
    }

    res.status(400).send('<h1>Invalid Action</h1>');
});


// ===============================
// --- SERVICE REQUEST WORKFLOW ---
// ===============================

app.post('/api/services', async (req, res) => {
    const { userEmail, serviceType, details } = req.body;
    console.log('Service request received:', req.body);

     try {
        await transporter.sendMail({
            from: '"BNB Website" <noreply@yourbnb.com>',
            to: HOST_EMAIL,
            subject: `New Service Request: ${serviceType}`,
            html: `
                <h1>New Service Request from ${userEmail}</h1>
                <p><strong>Service:</strong> ${serviceType}</p>
                <p><strong>Details:</strong> ${details}</p>
            `
        });
        res.status(200).json({ message: "Service request received and host has been notified." });
    } catch (emailError) {
        console.error('Failed to send service request email:', emailError);
        res.status(500).json({ message: "Request received, but failed to notify host." });
    }
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});