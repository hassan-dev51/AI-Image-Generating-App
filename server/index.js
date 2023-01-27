import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDb from "./mongodb/connect.js";
import postRoutes from "./Routes/postRoute.js";
import delleRoutes from "./Routes/delleRoutes.js";

dotenv.config();

const app = express();

//middleware

app.use(cors());
app.use(express.json({ limit: "50mb" }));
//routes

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", delleRoutes);
app.get("/", (req, res) => {
  res.send("Hi backend");
});

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log(`Server is running at port http://localhost:8080`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
