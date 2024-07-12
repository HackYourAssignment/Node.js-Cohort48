import express from 'express';
import path from 'path';
import { register, login, getProfile, logout, authenticateJWT } from './users.js';
// Use below import statement for importing middlewares from users.js for your routes
//import { ....... } from "./users.js";

let app = express();
const __dirname = path.resolve(); 
app.use(express.json());

// Create routes here, e.g. app.post("/register", .......)
app.post('/auth/login', login);
app.post('/auth/register', register);
app.post('/auth/logout', logout);
app.get('/auth/profile', getProfile);

app.use(express.static(path.join(__dirname, '../client')));

// Serve the front-end application from the `client` folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
