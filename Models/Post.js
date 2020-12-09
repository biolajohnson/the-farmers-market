import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      avatar: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  text: {
    type: String,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  postImage: {
    type: String,
  },
});
const Post = mongoose.model("post", postSchema);

export default Post;
