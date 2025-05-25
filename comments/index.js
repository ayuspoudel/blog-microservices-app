// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto'); 

// Initialize express app
const app = express();

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// In-memory store to hold comments by post ID
// Structure: { postId: [ { id, content }, ... ] }
const commentsByPostId = {};

// Route to retrieve all comments for a specific post
app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    // If no comments found for post, return an empty array
    res.send(commentsByPostId[postId] || []);
});

// Route to create a new comment for a specific post
app.post('/posts/:id/comments', (req, res) => {
    // Generate a random 4-byte hexadecimal comment ID
    const comment_id = require('crypto').randomBytes(4).toString('hex');

    const { content } = req.body;
    const postId = req.params.id;

    // Retrieve existing comments for the post or initialize an empty array
    const comments = commentsByPostId[postId] || [];

    // Add the new comment to the array
    comments.push({ id: comment_id, content });

    // Update the in-memory store
    commentsByPostId[postId] = comments;

    // Send back all comments for this post (including the new one)
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on port 4001');
});
