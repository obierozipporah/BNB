/**
 * Appwrite Function: notifyHostOnBooking
 * * This function is triggered when a new document is created in the 'reservations' collection.
 * It uses Nodemailer to send an email notification to the host with the new booking details.
 * * Environment Variables Required:
 * - APPWRITE_ENDPOINT: The API endpoint for your Appwrite project.
 * - APPWRITE_PROJECT_ID: Your Appwrite project's ID.
 * - APPWRITE_API_KEY: A secret API Key with 'documents.read' scope.
 * - HOST_EMAIL: The email address where notifications will be sent.
 * - EMAIL_HOST: The SMTP host for your email provider (e.g., 'smtp.sendgrid.net').
 * - EMAIL_PORT: The SMTP port (e.g., 587 or 465).
 * - EMAIL_USER: The username for your email provider (e.g., 'apikey' for SendGrid).
 * - EMAIL_PASSWORD: The password or API key for your email provider.
 */

const sdk = require('node-appwrite');
const nodemailer = require('nodemailer');

// The main function that Appwrite will execute
module.exports = async function (req, res) {
  // 1. VERIFY ENVIRONMENT VARIABLES
  // A safety check to ensure all required variables are set.
  const requiredVars = [
    'APPWRITE_ENDPOINT',
    'APPWRITE_PROJECT_ID',
    'APPWRITE_API_KEY',
    'HOST_EMAIL',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASSWORD'
  ];

  for (const aVar of requiredVars) {
    if (!process.env[aVar]) {
      console.error(`Error: Missing required environment variable: ${aVar}`);
      return res.json({ success: false, message: `Missing required environment variable: ${aVar}` }, 500);
    }
  }
  
  // 2. PARSE THE TRIGGER PAYLOAD
  // req.payload contains the data of the document that triggered the function.
  // It's a JSON string, so we need to parse it into an object.
  let reservation;
  try {
    if (!req.payload) {
      throw new Error("Request payload is empty. Function might not have been triggered correctly.");
    }
    reservation = JSON.parse(req.payload);
    console.log("Received reservation data:", JSON.stringify(reservation, null, 2));
  } catch (parseError) {
    console.error("Error parsing request payload:", parseError);
    return res.json({ success: false, message: "Invalid request payload." }, 400);
  }

  // 3. SET UP NODEMAILER TRANSPORTER
  // This object is responsible for connecting to your email provider and sending the email.
  // This example uses SMTP settings common for many providers, including SendGrid.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10), // Ensure port is an integer
    secure: process.env.EMAIL_PORT === '465', // Use SSL for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 4. COMPOSE THE EMAIL
  // Create the beautiful HTML email that will be sent to the host.
  const mailOptions = {
    from: '"Birnes BNB Notifier" <noreply@yourdomain.com>', // Use a no-reply address from your domain
    to: process.env.HOST_EMAIL,
    subject: `🎉 New Booking! Reservation for ${reservation.checkInDate}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #ff385c;">You've Received a New Reservation!</h1>
        <p>A new guest has booked a stay. Please review the details below and check your dashboard for more information.</p>
        <hr>
        <h3 style="color: #484848;">Booking Details:</h3>
        <ul>
          <li><strong>Guest Email:</strong> <a href="mailto:${reservation.userEmail}">${reservation.userEmail}</a></li>
          <li><strong>Check-in Date:</strong> ${new Date(reservation.checkInDate).toLocaleDateString()}</li>
          <li><strong>Check-out Date:</strong> ${new Date(reservation.checkOutDate).toLocaleDateString()}</li>
          <li><strong>Guests:</strong> ${JSON.parse(reservation.guests).adults} Adults, ${JSON.parse(reservation.guests).children || 0} Children</li>
          <li><strong>Status:</strong> <strong style="text-transform: capitalize;">${reservation.status}</strong></li>
          <li><strong>Reservation ID:</strong> ${reservation.$id}</li>
        </ul>
        <hr>
        <p style="font-size: 0.9em; color: #777;">This is an automated notification. Please do not reply to this email.</p>
      </div>
    `,
  };

  // 5. SEND THE EMAIL
  // Use a try...catch block to handle potential errors during the email sending process.
  try {
    console.log("Sending email notification to:", process.env.HOST_EMAIL);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully. Message ID:", info.messageId);
    
    // Respond with a success message.
    res.json({
      success: true,
      message: `Email sent to ${process.env.HOST_EMAIL}`,
    });
  } catch (emailError) {
    console.error("Error sending email:", emailError);
    // Respond with a server error message if the email fails to send.
    res.json({
      success: false,
      message: "Failed to send email notification.",
      error: emailError.message,
    }, 500);
  }
};