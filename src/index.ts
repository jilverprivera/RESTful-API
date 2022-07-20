import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config();

const {NODE_ENV, PORT} = process.env;

export const serverStart = (DEV_PORT?: number) => {
  connectDB();
  const APP_PORT = PORT || DEV_PORT;
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

  const server = app.listen(APP_PORT, () => {
    console.log("MODE: Production");
    console.log(`Running on: ${APP_PORT}.`);
  });
  return server;
};

serverStart(5000);
