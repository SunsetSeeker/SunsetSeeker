const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/new/:spotId', (req, res) => {
  const commentfromuser = req.body.comment;
  const spotId = req.params.spotId

  Comment.create({
    text: commentfromuser,
    sunset: spotId
  })
    .then(comment => {
        console.log(comment);
      res.status(201).json(comment);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/new/:spotId', (req,res) => {
    Comment.find()
    .then(comments => {
      res.status(200).json(comments); 
    })
    .catch(err => {
      res.json(err); 
    })
  }); 

  router.get('/:id', (req, res) => {
    Comment.find({sunset: req.params.id})
      .then(comments => {
        
          res.status(200).json(comments);
      })
      .catch(err => {
        res.json(err);
      });
  });

module.exports=router; 