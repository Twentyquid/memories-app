import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  imageFile: String,
  description: String,
  likeCount: { type: Number, default: 0 },
  author: String,
  createdOn: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false },
  modifiedOn: Date,
});

const Post = mongoose.model("Post", postSchema);

export default Post;
