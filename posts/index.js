const express  = require('express');
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto');

const app = express();

const posts = {};

app.get('/posts', (req,res) => {
    res.send(posts);
});

app.post('/posts', (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    post[id] = {
        id, title
    }

    res.status(201).send(post[id])
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})