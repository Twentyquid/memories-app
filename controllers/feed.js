import Post from "../models/posts.js";
import User from "../models/users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

export async function getFeed(req, res) {
  try {
    let response = await Post.find();
    // console.log("desturctured object in feed is:", { ...response });
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
    console.log("destuctured new post: ", { ...response });
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

export async function signUp(req, res) {
  let { username, email } = req.body;
  try {
    let oldUser = await User.findOne({ username });
    console.log("Old user is: ", oldUser);
    if (oldUser.name == username) {
      res.status(400).json({ status: "user already exists" });
    } else {
      let newUser = new User({ name: username, email });
      let response = await newUser.save();
      console.log("response after saging the user is: ", response);
      console.log("type of the response returned is: ", typeof response);
      console.log("destructured object is: ", { ...response });
      let { _doc: payload } = response;
      let token = jwt.sign({ ...payload }, JWT_PRIVATE_KEY);
      res.status(200).json(token);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "server error" });
  }
}
