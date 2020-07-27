const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    googleID: String, 
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdSpots: [
      {
        type: Schema.Types.ObjectId, 
        ref: "Sunset"
      }
    ],    

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    

      favorites: [{ type: Schema.Types.ObjectId, ref: "Sunset" }],
    },
    {
      timestamps: true,
    }

  );

const User = mongoose.model("User", userSchema);
module.exports = User;