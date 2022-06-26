import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import connectDB from "./db";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/categories";
import productRoutes from "./routes/products";
import imageRouter from "./routes/image";

dotenv.config();
const { PORT } = process.env;

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
app.use("/api", userRoutes); // -> /api/users | /api/user | /api/user/:id
app.use("/api", categoryRoutes); // -> /api/categories | /api/category | /api/category/:id
app.use("/api", productRoutes); // -> /api/products | /api/product | /api/product/:id
app.use("/api/image", imageRouter); // -> /api/image/upload | /api/image/remove

const APP_PORT = PORT || 5000;
app.listen(APP_PORT, () => {
  console.log(`Server: Active | Port: ${APP_PORT}.`);
});

export { app };
