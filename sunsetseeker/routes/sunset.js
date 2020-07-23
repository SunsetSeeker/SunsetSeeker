const express = require('express');
const router = express.Router();
const uploader = require('../cloudinary'); 
const Sunset = require('../models/Sunset');

router.post('/list', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  // const latitude= req.body.latitude; 
  // const longitude=req.body.longitude; 
  // const rating = [];
  console.log("test")
  // const { title, description, latitude, longitude, rating=[], img } = req.body;
  // const img=req.body.file.secure_url; 
  // const comment=??
  // const category=??
  // const user = req.user._id;

  Sunset.create({
    title,
    description,
    // latitude, 
    // longitude, 
    // rating: 0, 
    // img,    
    // category, 
    // comment, 
    // user: user
  })
    .then(sunset => {
      res.status(201).json(sunset);
    })
    .catch(err => {
      res.json(err);
    });
});


//get /api/sunsets
router.get('/list', (req,res) => {
  Sunset.find()
  .then(sunsets => {
    res.status(200).json(sunsets); 
  })
  .catch(err => {
    res.json(err); 
  })
}); 

router.get('/:id', (req, res) => {
  Sunset.findById(req.params.id)
    .then(sunset => {
      if (!sunset) {
        res.status(404).json(sunset);
      } else {
        res.status(200).json(sunset);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  const { title, description } = req.body;

  Sunset.findByIdAndUpdate(
    req.params.id,
    { title, description },
    // { new: true } ensures that we are getting the updated document in the .then callback
    { new: true }
  )
    .then(sunset => {
      res.status(200).json(sunset);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete the project
  Sunset.findByIdAndDelete(req.params.id)
    .then(sunset => {
      // return Task.deleteMany({ _id: { $in: project.tasks } })
      res.status(200).json({ message: 'ok' });
      // .then(() => {
      //   res.status(200).json({ message: 'ok' });
      // });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports=router; 