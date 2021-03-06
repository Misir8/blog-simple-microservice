const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    axios = require('axios'),
    app = express(),
    {randomBytes} = require('crypto');

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;

    //axios
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments);
});

app.post('/events', (req, res) => {
    console.log('received event', req.body.type);

    res.send({});
});

app.listen(4001, () => {
    console.log('Port listening on 4001');
});
