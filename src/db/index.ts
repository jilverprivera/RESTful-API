import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = () => {
  const { MONGODB_URL, MONGODB_URL_TEST, NODE_ENV } = process.env;
  const connectionURL = NODE_ENV === "test" ? MONGODB_URL_TEST : MONGODB_URL;
  if (!connectionURL) {
    throw new Error(`Couldn't access to DB.`);
  }
  mongoose.connect(connectionURL);
  console.log("DB connection: Active.");
};

export default connectDB;
