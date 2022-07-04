import express from "express";

import { tokenValidation, authAdmin } from "../../middlewares";
import { paymentController } from "./controller";

const router = express.Router();

router
  .route("/")
  .get(tokenValidation, authAdmin, paymentController.getPayments)
  .post(tokenValidation, paymentController.createPayment);

export default router;
