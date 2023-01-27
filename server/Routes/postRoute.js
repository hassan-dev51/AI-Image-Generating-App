import express from "express";
import postSchema from "../mongodb/models/post.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

//this is essential to use the env variable in file
dotenv.config();
const routes = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

routes.get("/", async (req, res) => {
  try {
    const posts = await postSchema.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
});

routes.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    //getting photo url from cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);
    //this will create a schema in database
    const newPost = await postSchema.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error);
  }
});

export default routes;
