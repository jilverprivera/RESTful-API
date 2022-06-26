import express from "express";

import { productsController } from "../controllers";
import { authAdmin, tokenValidation, validateFields } from "../middlewares";

const router = express.Router();

router.route("/products").get(productsController.getProdutcts);
router
  .route("/product")
  .post(
    tokenValidation,
    authAdmin,
    validateFields,
    productsController.createProduct
  );
router
  .route("/product/:id")
  .get(tokenValidation, productsController.getProductByID)
  .put(tokenValidation, authAdmin, productsController.updateProductByID)
  .delete(tokenValidation, authAdmin, productsController.removeProductByID);

export default router;
