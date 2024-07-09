// prep-exercise/server/app.js
const express = require('express');
const { register, login, authenticateJWT, getProfile, logout } = require('./users');

let app = express();

app.use(express.json());

// Define routes
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/profile', authenticateJWT, getProfile);
app.post('/auth/logout', logout);

// Serve the front-end application from the client folder
app.use(express.static('client'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
