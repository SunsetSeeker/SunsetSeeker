const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const trimExtension = fileName => {
  return fileName
    .split(".")
    .slice(0, -1)
    .join(".");
};
 
var storage = cloudinaryStorage({
  cloudinary,
  folder: "folder-name", 
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, trimExtension(file.originalname)); 
  }
});

const uploader = multer({ storage: storage });
module.exports = uploader;

 

