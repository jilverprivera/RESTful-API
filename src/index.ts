import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const {MONGODB_URL, MONGODB_URL_TEST, NODE_ENV, PORT} = process.env;

const connectionURL = NODE_ENV === "test" ? MONGODB_URL_TEST : MONGODB_URL;

if (!connectionURL) {
  throw new Error("Couldn't access to DB.");
}
mongoose.connect(connectionURL);

NODE_ENV === "development" && console.log("DB: Active.");

export const serverStart = (DEV_PORT?: number) => {
  if (NODE_ENV === "test") {
    const server = app.listen(PORT, () => {
      console.log("Server: Active.");
    });
    return server;
  }
  if (NODE_ENV === "development") {
    const server = app.listen(DEV_PORT, () => {
      console.log("MODE: Development");
      console.log(`Port: ${APP_PORT}.`);
    });
    return server;
  }

  const APP_PORT = PORT || DEV_PORT;
  const server = app.listen(APP_PORT, () => {
    console.log("MODE: Production");
    console.log(`Running on: ${APP_PORT}.`);
  });
  return server;
};
serverStart(5000);
