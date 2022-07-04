import express from "express";
import { check } from "express-validator";

import { categoriesController } from "./controller";
import { authAdmin, tokenValidation, validateFields } from "../../middlewares";

const router = express.Router();

router.route("/categories").get(categoriesController.getCategories);

router
  .route("/category")
  .post(
    check("name", "name is required").not().isEmpty(),
    tokenValidation,
    authAdmin,
    validateFields,
    categoriesController.createCategory
  );

router
  .route("/category/:id")
  .get(categoriesController.getCategoryByID)
  .put(tokenValidation, authAdmin, categoriesController.updateCategoryByID)
  .delete(tokenValidation, authAdmin, categoriesController.deleteCategoryByID);

export default router;
