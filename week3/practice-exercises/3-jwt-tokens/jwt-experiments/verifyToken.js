const jwt = require('jsonwebtoken');

function verifyToken(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    console.log('Decoded Payload:', decoded);
    return decoded;
  } catch (err) {
    console.error('Token verification failed:', err.message);
  }
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzIwODEwNzQ1LCJleHAiOjE3MjA4MTQzNDV9.b3e8AzwL2QaVOZcnyhLNNvOFdmpY9cjhIhkKxWZZj8o';
const secret = 'your-256-bit-secret';

verifyToken(token, secret);
