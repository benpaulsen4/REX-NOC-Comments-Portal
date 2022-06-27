const express = require('express');
const cors = require('cors');
const db = require('./db')

const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/new', async(req, res) => {
    result = await db.newComment(req.body);
    console.log("Comment created");
    console.log(result);
    res.send(200);
});

app.get('/sites', async(req, res) => {
    sites = await db.getSites();
    console.log("Returning sites");
    console.log(sites);
    res.send({result: sites});
});

app.get('/comments', async(req, res) => {
    comments = await db.getComments(req.body);
    console.log("Returning comments");
    console.log(comments);
    res.send({result: comments});
});

app.post('/delete', async(req, res) => {
    result = await db.deleteComment(req.body);
    console.log("Deleting comment");
    console.log(result);
    res.send(200);
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));