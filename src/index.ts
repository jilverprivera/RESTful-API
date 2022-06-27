import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import connectDB from "./db";

import userRoute from "./api/users";
import authRoutes from "./api/auth";
import categoryRoutes from "./api/categories";
import productRoutes from "./api/products";
import imageRoutes from "./api/images";
import paymentRoutes from "./api/payments";

dotenv.config();
const { PORT, NODE_ENV } = process.env;

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

app.use("/auth", authRoutes); // -> /auth/signin | /auth/signup
app.use("/api", userRoute); // -> /api/users | /api/user | /api/user/:id
app.use("/api", categoryRoutes); // -> /api/categories | /api/category | /api/category/:id
app.use("/api", productRoutes); // -> /api/products | /api/product | /api/product/:id
app.use("/api/image", imageRoutes); // -> /api/image/upload | /api/image/remove
app.use("/api/payments", paymentRoutes); // -> /api/payment/

const APP_PORT = PORT || 5000;
app.listen(APP_PORT, () => {
  NODE_ENV === "development" && console.log(`Port: ${APP_PORT}.`);
  NODE_ENV === "development" && console.log("Server: Active.");
});

export { app };
