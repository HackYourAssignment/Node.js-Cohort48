const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// YOUR CODE GOES IN HERE
app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
      const content = fs.readFileSync(title, 'utf8');
      res.send(content);
  } else {
      res.status(404).send('This post does not exist!');
  }
});

// Create
app.post('/blogs', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
      return res.status(400).send('Title and content are required');
  }
  fs.writeFileSync(title, content);
  res.send('ok');
});


// Update
app.put('/blogs/:title', (req, res) => {
  const title = req.params.title;
  const { content } = req.body;
  if (!content) {
      return res.status(400).send('Content is required');
  }
  if (fs.existsSync(title)) {
      fs.writeFileSync(title, content);
      res.send('ok');
  } else {
      res.status(404).send(`This post don't exist!`);
  }
});


app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
      fs.unlinkSync(title);
      res.send('ok');
  } else {
      res.status(404).send('This post does not exist!');
  }
});


// Read all 
app.get('/blogs', (req, res) => {
  const files = fs.readdirSync('.');
  const blogs = files.filter(file => file !== 'server.js' && file !== 'package.json' && file !== 'readme.md').map(file => ({ title: file }));
  res.json(blogs);
});


app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});