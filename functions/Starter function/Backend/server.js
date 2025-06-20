const express = require('express');
const cors = require('cors');
// Import all our mock data
const { homePageData, allListingsData, menuData, stayEasyServiceItems } = require('./data');

const app = express();
// Use a port that is different from your React app (which usually runs on 3000)
const PORT = process.env.PORT || 5002;

// --- Middleware ---
// Enable CORS for all routes, allowing your frontend to make requests
app.use(cors());
// Enable the express server to parse JSON in the body of requests (for POST/PUT)
app.use(express.json());


// --- API Endpoints ---

// A simple test route to make sure the server is working
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Birne's BNB Backend!" });
});

// GET: Homepage Content
app.get('/api/home-content', (req, res) => {
  // Simulate a network delay for realism
  setTimeout(() => {
    res.json(homePageData);
  }, 300); // 300ms delay
});

// GET: All Listings for the Listings Page
app.get('/api/listings', (req, res) => {
  setTimeout(() => {
    res.json(allListingsData);
  }, 500); // 500ms delay
});

// GET: Menu Data for the Services Page
app.get('/api/menu', (req, res) => {
  setTimeout(() => {
    res.json(menuData);
  }, 200);
});

// GET: Stay Easy Service Items
app.get('/api/stay-easy-items', (req, res) => {
  setTimeout(() => {
    res.json(stayEasyServiceItems);
  }, 100);
});

// POST: For a new Booking Inquiry
app.post('/api/booking-inquiry', (req, res) => {
  const bookingDetails = req.body; // The data sent from the frontend form
  
  console.log('--- Received Booking Inquiry ---');
  console.log(bookingDetails);
  console.log('----------------------------');

  // Simulate checking for availability. We'll randomly "reject" about 10% of bookings.
  if (Math.random() < 0.1) {
    console.log('Simulating "fully booked" status.');
    // Send back a 409 Conflict status code
    return res.status(409).json({
      message: `Sorry, the dates from ${bookingDetails.checkInDate} to ${bookingDetails.checkOutDate} are fully booked. Please try other dates.`,
      errorType: 'availability'
    });
  }

  // Simulate a successful booking request
  res.status(201).json({ // 201 Created status code for success
    message: 'Booking inquiry received! We will contact you shortly to confirm.',
    bookingConfirmation: {
      id: `BKG-${Date.now()}`, // Create a simple unique ID
      ...bookingDetails,
      status: 'Pending Confirmation'
    }
  });
});

// POST: For a new Food Order
app.post('/api/food-order', (req, res) => {
  const { cart, grandTotal } = req.body;
  
  console.log('--- Received Food Order ---');
  console.log('Cart Items:', cart);
  console.log('Grand Total:', grandTotal);
  console.log('-------------------------');

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Your cart is empty. Cannot place order.' });
  }

  res.status(201).json({
    message: 'Food order placed successfully!',
    orderId: `ORD-${Date.now()}`,
    estimatedDelivery: '30-45 minutes'
  });
});

// POST: For a new Stay Easy Service Request
app.post('/api/service-request', (req, res) => {
  const { items } = req.body;
  
  console.log('--- Received Stay Easy Service Request ---');
  console.log('Requested Items:', items);
  console.log('------------------------------------');

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items were requested.' });
  }

  res.status(201).json({
    message: 'Your service request has been received and is being processed!',
    requestId: `REQ-${Date.now()}`
  });
});


// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`BNB Backend server running on http://localhost:${PORT} 🚀`);
});