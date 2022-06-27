import fs from "fs";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { v2 } from "cloudinary";

import { File } from "../interfaces/fileInterface";
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
});

export const imageController = {
  uploadImage: (req: Request, res: Response) => {
    try {
      const { file }: any = req.files;
      console.log(file);
      const { tempFilePath, size, mimetype }: File = file;
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No images selected." });
      }
      if (size > 1024 * 1024) {
        removeTmpFiles(tempFilePath);
        return res.status(400).json({ message: "Image size is too large." });
      }
      if (
        mimetype !== "image/jpeg" &&
        mimetype !== "image/webp" &&
        mimetype !== "image/png"
      ) {
        removeTmpFiles(tempFilePath);
        return res.status(400).json({ message: "Incorrect image format" });
      }
      return v2.uploader.upload(
        tempFilePath,
        { folder: "tech-ecommerce" },
        (err, result) => {
          if (err) throw err;
          removeTmpFiles(tempFilePath);
          res.status(200).json({
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
