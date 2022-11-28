const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: string,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: User.Schema.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: false,
      },
      name: {
        type: String,
      },
      avatar: {
        type: string,
      },
    },
  ],
});

model.exports = Post = mongoose.model("post");
