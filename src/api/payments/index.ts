import express from "express";

const router = express.Router();
import { tokenValidation, authAdmin } from "../../middlewares";
import { paymentController } from "./controller";

router
  .route("/")
  .get(tokenValidation, authAdmin, paymentController.getPayments)
  .post(tokenValidation, paymentController.createPayment);

export default router;
