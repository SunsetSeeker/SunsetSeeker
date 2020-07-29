const express = require('express');
const router = express.Router();
const uploader = require('../configs/cloudinary.js');
const Sunset = require('../models/Sunset');
const User = require('../models/User');

router.get("/favorites", (req, res) => {
  User.findById(req.user._id)
    .populate("favorites")
    .then((user) => {
      if (!user) {
        res.status(404).json(user);
      }
      res.json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

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



// For rating feature 
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

// For favorite feature 
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


router.put("/favorites/:placeId", async (req, res) => {
  const userId = req.user._id;
  let user = await User.findById(userId);
  let isFavorite = user.favorites.find((favorite) => {
    return favorite == req.params.placeId;
  });
  if (isFavorite) {
    User.findByIdAndUpdate(
      userId,
      {
        $pull: { favorites: req.params.placeId },
      },
      {
        new: true,
      }
    )
      .populate("favorites")
      .then((userUpdated) => {
        Sunset.findByIdAndUpdate(
          req.params.placeId,
          {
            $inc: {likes: -1},
          },
          { new: true }
        ).then(sunsetUpdated => res.json(sunsetUpdated))
        res.json(userUpdated)
      })
      .catch((err) => res.status(400).json(err));
  } else {
    User.findByIdAndUpdate(
      userId,
      {
        $push: { favorites: req.params.placeId },
      },
      {
        new: true,
      }
    )
      .populate("favorites")
      .then((userUpdated) => {
        Sunset.findByIdAndUpdate(
          req.params.placeId,
          {
            $inc: {likes: 1},
          },
          { new: true }
        ).then(sunsetUpdated => res.json(sunsetUpdated))
      })
      .catch((err) => res.status(400).json(err));
  }
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


router.put('/deletepic/:id', (req, res) => {
  //delete only one picture
  const picId=req.params.id; 
  const picUrl=req.body.picUrl; 
  console.log("DELETE IT", picId, picUrl)
  Sunset.findByIdAndUpdate(picId,
    {img: picUrl}, {new: true}
    ).then((sunset) => {
    console.log("picture deleted.", sunset)
    res.status(200).json(sunset); 
  }).catch(err => console.log(err))
})


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


module.exports=router; 