import { v2 } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();

const {
  CLOUDINARY_CLOUD_API_KEY,
  CLOUDINARY_CLOUD_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = process.env;

v2.config({
  cloud_name: String(CLOUDINARY_CLOUD_NAME),
  api_key: String(CLOUDINARY_CLOUD_API_KEY),
  api_secret: String(CLOUDINARY_CLOUD_API_SECRET),
  secure: true,
});

export const imageController = {
  uploadImage: (req: any, res: Response) => {
    try {
      const file = req.files.file;
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No images selected." });
      }
      if (file.size > 1024 * 1024) {
        removeTmpFiles(file.tempFilePath);
        return res.status(400).json({ message: "Image size is too large." });
      }
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "image/png"
      ) {
        removeTmpFiles(file.tempFilePath);
        return res.status(400).json({ message: "Incorrect image format" });
      }
      return v2.uploader.upload(
        file.tempFilePath,
        { folder: "tech-ecommerce" },
        (err, result) => {
          if (err) throw err;
          removeTmpFiles(file.tempFilePath);
          return res.status(200).json({
            result,
          });
        }
      );
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },
  removeImage: (req: Request, res: Response) => {
    try {
      const { public_id } = req.body;
      if (!public_id) {
        return res
          .status(400)
          .json({ message: "No image public Id selected." });
      }
      v2.uploader.destroy(public_id, async (err: any) => {
        if (err) throw err;
      });
      return res.status(200).json({ message: "Image deleted succcesfully." });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },
};
const removeTmpFiles = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
