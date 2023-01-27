import mongoose from "mongoose";

const post = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  prompt: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
});

const postSchema = mongoose.model("POST", post);

export default postSchema;
