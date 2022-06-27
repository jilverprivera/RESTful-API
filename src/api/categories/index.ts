import express from "express";

import { categoriesController } from "./controller";
import { authAdmin, tokenValidation, validateFields } from "../../middlewares";

const router = express.Router();

router
  .route("/categories")
  .get(tokenValidation, authAdmin, categoriesController.getCategories);

router
  .route("/category")
  .post(
    tokenValidation,
    authAdmin,
    validateFields,
    categoriesController.createCategory
  );

router
  .route("/category/:id")
  .get(tokenValidation, categoriesController.getCategoryByID)
  .put(tokenValidation, authAdmin, categoriesController.updateCategoryByID)
  .delete(tokenValidation, authAdmin, categoriesController.deleteCategoryByID);

router.get("/", tokenValidation, authAdmin, categoriesController.getCategories);

export default router;
