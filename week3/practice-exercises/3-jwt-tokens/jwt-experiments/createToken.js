// first create jsonwebtoken with npm install
const jwt = require('jsonwebtoken');

function createToken(payload, secret, options) {
  return jwt.sign(payload, secret, options);
}

const payload = { userId: 123, isAdmin: true };
const secret = 'your-256-bit-secret';
const options = { expiresIn: '1h' };

const token = createToken(payload, secret, options);
console.log('JWT Token:', token);
