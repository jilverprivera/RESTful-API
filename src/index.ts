import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import connectDB from "./db";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const { PORT } = process.env;
const APP_PORT = PORT || 5000;
app.listen(APP_PORT, () => {
  console.log(`Server: Active | Port: ${APP_PORT}.`);
});

export { app };
