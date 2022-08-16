import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import feedRoute from "./routes/feed.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(
  express.json({
    limit: "3mb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "3mb" }));

app.use("/feed", feedRoute);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
