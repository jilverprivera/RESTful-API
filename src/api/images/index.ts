import express from "express";
import {authAdmin, tokenValidation} from "../../middlewares";

import {imageController} from "./controller";

const router = express.Router();

router
  .route("/upload")
  .post(tokenValidation, authAdmin, imageController.uploadImage);
router
  .route("/remove")
  .post(tokenValidation, authAdmin, imageController.removeImage);

export default router;
