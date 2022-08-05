import Post from "../models/posts.js";
import mongoose from "mongoose";

export async function getFeed(req, res) {
  try {
    let response = await Post.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "not found" });
  }
}

export async function createFeed(req, res) {
  let body = req.body;
  //   console.log(req.body);
  try {
    let newPost = new Post(body);
    let response = await newPost.save();
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "not found" });
  }
}

export async function updateFeed(req, res) {
  //   console.log("body of request is: ", req.body);
  //   console.log("url params: ", req.params);
  //   res.status(200).json({ status: "received" });
  let { id: _id } = req.params;
  let body = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({ status: "invalid id" });
    } else {
      let response = await Post.findByIdAndUpdate(_id, body, { new: true });
      res.status(201).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "server error" });
  }
}
