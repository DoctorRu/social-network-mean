const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passwords = require('./secret');
// const cors = require('cors');

// Models
const Post = require('./models/post');

// Other
const databaseUrl = "mongodb+srv://dbu-social:" + passwords.databasePassword + "@social-uhcyc.mongodb.net/social-mean?retryWrites=true&w=majority";
mongoose.connect(databaseUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('Connected to the database')
  })
  .catch(err => {
    console.log('Error: ', err)
  });


// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Headers - CORS
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
// POST
app.post('/api/posts', (req, res, next) => {
  console.log('Call POST /api/posts ', req.body);

  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save()
    .then( result => {
      console.log('Post saved', result);
      res.status(201).json({
        message: 'Post added successfully'
      });
    })
    .catch( err => {
      console.log('Post save error: ', err)
    })
})

// GET
app.get('/api/posts', (req, res, next) => {

  Post.find()
    .then( posts => {
      console.log('Fechted posts: ', posts);
      res.status(200).json(
        {
          message: 'Post fechted succesfully',
          posts: posts
        }
      );
    })
    .catch( err => {
      console.log('Error fetching posts', err);
    });
})

module.exports = app;