/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

//create a server
let server = http.createServer(async function (req, res) {
    if (req.url === '/' || req.url === '/index.html') {
        try {
            const filePath = path.join(__dirname, 'index.html');
            const data = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('500 Internal Server Error');
        }
    } if (req.url === '/index.js') {
        try {
            const filePath = path.join(__dirname, 'index.js');
            const data = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/javascript' });
            res.end('500 Internal Server Error');
        }
    } if (req.url === '/style.css') {
        try {
            const filePath = path.join(__dirname, 'style.css');
            const data = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/css' });
            res.end('500 Internal Server Error');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/css' });
        res.end('404 Not Found');
    }
});

server.listen(3000, () => { console.log('Server is listening on port http://localhost:3000'); });