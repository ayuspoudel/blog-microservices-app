const express = require('express');              // Import Express framework
const { randomBytes } = require('crypto');       // Import randomBytes to generate random IDs
const bodyParser = require('body-parser');       // Middleware to parse JSON bodies

const app = express();                           // Initialize an Express app
app.use(bodyParser.json());                      // Parse incoming JSON requests into JS objects

const posts = {};                                // In-memory store for posts

// GET /posts — Return all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// POST /posts — Create a new post
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');   // Generate a random 4-byte hex ID
    const { title } = req.body;                  // Extract 'title' from the request body

    posts[id] = { id, title };                   // Save the new post

    res.status(201).send(posts[id]);             // Respond with the created post
});

// Start the server on port 4000
app.listen(4000, () => {
    console.log('Listening on port 4000');
});
