import express from "express";
import { check } from "express-validator";

import { productsController } from "./controller";
import { authAdmin, tokenValidation, validateFields } from "../../middlewares";

const router = express.Router();

router.route("/products").get(productsController.getProdutcts);
router
  .route("/product")
  .post(
    check("name", "name is required").not().isEmpty(),
    check("price", "price is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
    check("content", "content is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
    check("sold", "sold quantity is required").not().isEmpty(),
    check("stock", "stock quantity is required").not().isEmpty(),
    tokenValidation,
    authAdmin,
    validateFields,
    productsController.createProduct
  );
router
  .route("/product/:id")
  .get(productsController.getProductByID)
  .put(tokenValidation, authAdmin, productsController.updateProductByID)
  .delete(tokenValidation, authAdmin, productsController.removeProductByID);

export default router;
