import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const routes = express.Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRETKEY,
});

const openai = new OpenAIApi(configuration);

routes.get("/", (req, res) => {
  res.send("Hello delle");
});
routes.post("/", async (req, res) => {
  try {
    //this line will get the text from the frontend
    const { prompt } = req.body;
    //this syntax  will actually generate the image
    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    // we will store this response into the variable
    const image = aiResponse.data.data[0].b64_json;
    //this line will send the data to ui photo is a variable
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error, "dell catch");
    res.status(500).send(error?.response.data.error.message, "dell err");
  }
});
export default routes;
