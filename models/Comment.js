const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: String,
  // user: { 
  //   type: Schema.Types.ObjectId, 
  //   ref: 'User' },
  sunset: {
      type: Schema.Types.ObjectId,
      ref: 'Sunset'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment; 