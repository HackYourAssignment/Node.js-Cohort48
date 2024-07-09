const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Create a new blog post
app.post('/blogs', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required');
    }
    fs.writeFileSync(`${title}.txt`, content, 'utf8');
    res.send('ok');
});

// Read a single blog post
app.get('/blogs/:title', (req, res) => {
    const title = req.params.title;
    if (fs.existsSync(`${title}.txt`)) {
        const content = fs.readFileSync(`${title}.txt`, 'utf8');
        res.send(content);
    } else {
        res.status(404).send('This post does not exist!');
    }
});

// Update an existing blog post
app.put('/blogs/:title', (req, res) => {
    const title = req.params.title;
    const { content } = req.body;
    if (!content) {
        return res.status(400).send('Content is required');
    }
    if (fs.existsSync(`${title}.txt`)) {
        fs.writeFileSync(`${title}.txt`, content, 'utf8');
        res.send('ok');
    } else {
        res.status(404).send('This post does not exist!');
    }
});

// Delete an existing blog post
app.delete('/blogs/:title', (req, res) => {
    const title = req.params.title;
    if (fs.existsSync(`${title}.txt`)) {
        fs.unlinkSync(`${title}.txt`);
        res.send('ok');
    } else {
        res.status(404).send('This post does not exist!');
    }
});

// Read all blog posts
app.get('/blogs', (req, res) => {
    const files = fs.readdirSync('.');
    const posts = files.filter(file => file.endsWith('.txt')).map(file => ({
        title: file.slice(0, -4)
    }));
    res.json(posts);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
