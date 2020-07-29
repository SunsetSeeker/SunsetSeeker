const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sunsetSchema = new Schema({
  title: String,
  description: String,
  // location: Array, 
  latitude: Number, 
  longitude: Number,

  likes: {
    type: Number,
    default: 0,
  },
  rating: [Number], 
  owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
      },
  img: [String],  
  
  category: {
    type: String, 
    enum: ['Sunset', 'Sunrise']
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

const Sunset = mongoose.model('Sunset', sunsetSchema);
module.exports = Sunset;