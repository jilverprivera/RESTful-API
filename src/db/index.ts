import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const {MONGODB_URL, MONGODB_URL_TEST, NODE_ENV} = process.env;

const connectionURL = NODE_ENV === "test" ? MONGODB_URL_TEST : MONGODB_URL;
const connectDB = () => {
  if (!connectionURL) {
    throw new Error("Couldn't access to DB.");
  }
  const db = mongoose.connect(connectionURL);
  NODE_ENV === "development" && console.log("DB: Active.");
  return db;
};

export default connectDB;
