const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// const cors = require('cors');

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// VERBS
app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log('POST call', post);
  res.status(201).json({
    message: 'Post added successfully'
  })
})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: '1',
      title: 'Backend - Post 1 title',
      content: 'Backend - Post 1 content'
    },
    {
      id: '2',
      title: 'Backend - Post 2 title',
      content: 'Backend - Post 2 content'
    },
    {
      id: '3',
      title: 'Backend - Post 3 title',
      content: 'Backend - Post 3 content'
    }
  ]
  res.status(200).json(
    {
      message: 'Post fechted succesfully',
      posts: posts
    }
  );

})

module.exports = app;