import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addUser, getUserByUsername, getUserById } from './userStore.js';

const secret = 'your_jwt_secret'; // Use a strong secret key in production

// Register Middleware
export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = getUserByUsername(username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), username, password: hashedPassword };

  addUser(user);

  res.status(201).json({ id: user.id, username: user.username });
};

// Login Middleware
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = getUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

  res.status(201).json({ token });
};

// Authenticate JWT Middleware
export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = user;
    next();
  });
};

// Get Profile Middleware
export const getProfile = (req, res) => {
  const user = getUserById(req.user.id);

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  res.status(200).json({ username: user.username });
};

// Logout Middleware
export const logout = (req, res) => {
  res.status(204).send();
};
