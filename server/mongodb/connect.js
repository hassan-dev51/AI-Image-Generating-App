import mongoose from "mongoose";

const connectDb = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("connection successful"))
    .catch(() => console.log("connection failed"));
};
export default connectDb;
