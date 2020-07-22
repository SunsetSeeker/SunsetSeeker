const express = require('express');
const router = express.Router();
const Sunset = require('../models/Sunset');

router.post('/dashboard', (req, res) => {
  // const title = req.body.title;
  // const description = req.body.description;
  // const latitude= req.body.latitude; 
  // const longitude=req.body.longitude; 
  // const rating = [];

  const { title, description, latitude, longitude, rating=[] } = req.body;
  const img=req.body.file.secure_url; 
  // const comment=??
  // const category=??
  // const user = req.user._id;

  Sunset.create({
    title,
    description,
    latitude, 
    longitude, 
    rating: 0, 
    img,    
    category, 
    comment, 
    // user: user
  })
    .then(sunset => {
      res.status(201).json(sunset);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/dashboard', (req,res) => {
  Sunset.find()
  .then(sunsets => {
    res.status(200).json(sunsets); 
  })
  .catch(err => {
    res.json(err); 
  })
}); 



module.exports=router; 