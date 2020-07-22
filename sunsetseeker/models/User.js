const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: "Sunset" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;