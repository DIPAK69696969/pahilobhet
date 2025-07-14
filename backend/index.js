const express = require('express');
const cors = require('cors');
const path = require('path');

// Import controllers
const authController = require('./src/controllers/authUserManagement.controller');
const matchingController = require('./src/controllers/matchingSystem.controller');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes (existing)
app.post('/api/auth/signup', authController.signup);
app.post('/api/auth/login', authController.login);

// Matching system routes
app.get('/api/matching/profiles', authenticateToken, matchingController.getProfiles);
app.post('/api/matching/like', authenticateToken, matchingController.likeUser);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'PahiloBhet API is running!' });
});

// Serve static files from React app (for production)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch all handler for React Router (for production)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 PahiloBhet server running on port ${PORT}`);
});