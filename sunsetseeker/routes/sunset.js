const express = require('express');
const router = express.Router();
const uploader = require('../configs/cloudinary');
const Sunset = require('../models/Sunset');

router.post('/', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const img=req.body.file.secure_url; 

  // const latitude= req.body.latitude; 
  // const longitude=req.body.longitude; 
  // const rating = [];
  // const { title, description, latitude, longitude, rating=[], img } = req.body;
  // const comment=??
  // const category=??
  //const user = req.user._id;

  Sunset.create({
    title,
    description,
    img,

    // latitude, 
    // longitude, 
    // rating: 0,    
    // category, 
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
router.get('/', (req,res) => {
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

// for image upload 
router.post("/upload", uploadCloud.single("img"), (req, res, next) => {
  const img=req.body.file.secure_url; 
 
  Movie.create({ title, description, imgPath, imgName })
    .then(movie => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});


module.exports=router; 