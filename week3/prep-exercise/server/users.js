// Create middlewares required for routes defined in app.js
// export const register = async (req, res) => {};

// You can also create helper functions in this file to help you implement logic
// inside middlewares

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';


const users = [];

const secretKey = '9b1a1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f';

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = { id: uuidv4(), username, password: hashedPassword };
  users.push(user);
  res.status(201).json({ id: user.id, username: user.username });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
  res.status(200).json({ token });
};

export const getProfile = (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    res.status(200).json({ username: user.username });
  });
};

export const logout = (req, res) => {
  res.status(204).send();
};


export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = user;
    next();
  });
};