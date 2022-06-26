import express from "express";
import { imageController } from "../controllers";

const router = express.Router();

router.route("/upload").post(imageController.uploadImage);
router.route("/remove").post(imageController.removeImage);

export default router;