const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 5000; // We'll run our backend on this port

// --- Middleware Setup ---
app.use(cors()); // Allows your React app to talk to this server
app.use(bodyParser.json()); // Parses incoming JSON data from requests

// --- Database Path ---
const dbPath = path.join(__dirname, 'db.json');

// --- Helper Functions to Read/Write to our JSON DB ---
const readUsers = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data).users;
};

const writeUsers = (users) => {
    const data = JSON.stringify({ users }, null, 2);
    fs.writeFileSync(dbPath, data);
};

// --- API Routes ---

// 1. User Sign Up Endpoint
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const users = readUsers();

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now().toString(), // Simple unique ID
        name,
        email,
        password: hashedPassword // Store the hashed password
    };

    users.push(newUser);
    writeUsers(users);

    console.log('New user signed up:', newUser);
    res.status(201).json({ message: "User created successfully!", userId: newUser.id });
});

// 2. User Login Endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }
    
    const users = readUsers();
    
    // Find the user by email
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare the submitted password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    console.log('User logged in:', user.email);
    // In a real app, you would return a JWT token here. For now, we send a success message.
    res.status(200).json({ message: "Login successful!", user: { id: user.id, name: user.name, email: user.email }});
});


app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});