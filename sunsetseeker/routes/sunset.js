const express = require('express');
const router = express.Router();
const uploader = require('../configs/cloudinary.js');
const Sunset = require('../models/Sunset');

router.post('/', (req, res) => {
  const title = req.body.title;
  const file = req.body.file; 
  const description = req.body.description;
  const img=req.body.file; 


  const latitude= req.body.latitude; 
  const longitude=req.body.longitude; 
  // const rating = [];
  // const { title, description, latitude, longitude, rating=[], img } = req.body;
  const comment = [];
  // const category=??
  const owner = req.user._id;


  Sunset.create({
    title,
    description,
    latitude,
    longitude,
    img, 
    comment, 
    owner, 
    rating: 0,
    
    
    // rating: 0,    
    // category, 
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

router.put('/rating/:id', (req, res) => {
  const { rating } = req.body;

  Sunset.findByIdAndUpdate(
    req.params.id,
    { $push: {rating: rating} },
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

router.put('/:id', (req, res) => {
  const { title, description, img } = req.body;

  Sunset.findByIdAndUpdate(
    req.params.id,
    { title, description, img },
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
      console.log("deleted");
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
router.post("/upload", uploader.single("img"), (req, res, next) => {
  // const img=req.body.file.secure_url; 
  if(!req.file) {
    next(new Error("No file uploaded")); 
    return; 
  }
  res.json({secure_url: req.file.secure_url}); 
});

router.patch("/rating/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  Sunset.findByIdAndUpdate(
    req.params.id,
    {
      rating: parseFloat(req.body.rating.toFixed(1)),
    },
    { new: true }
  ).then((place) => res.json(place));
});

// router.get('/edit/:id', (req, res) => {
//   Sunset.findById(req.params.id)
//     .then(sunset => {
//       if (!sunset) {
//         res.status(404).json(sunset);
//       } else {
//         res.status(200).json(sunset);
//       }
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });


router.delete('/deletepic/:id', (req, res) => {
  //delete only one picture
  const pic=req.params.singleImg; 
  console.log("DELETE IT", pic)
  Sunset.findByIdAndUpdate( 
    {$pull: {name: pic}}
    ).then(() =>
    res.status(200).json({message: "ok"})); 
    console.log("picture deleted.")
})

module.exports=router; 