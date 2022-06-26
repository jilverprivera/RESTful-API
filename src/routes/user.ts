import express from "express";

import { userController } from "../controllers";
import { authAdmin, tokenValidation } from "../middlewares";

const router = express.Router();

router.route("/users").get(tokenValidation, authAdmin, userController.getUsers);

router
  .route("/user/:id")
  .put(tokenValidation, authAdmin, userController.updateUserByID)
  .delete(tokenValidation, authAdmin, userController.removeUserByID);

router.get("/user/info", tokenValidation, userController.getUserByID);
router.get("/user/re_new", tokenValidation, userController.reValidateToken);
router.get("/user/payment", tokenValidation, userController.getHistoryPayment);
router.patch("/user/add_cart", tokenValidation, userController.addToCartList);
router.patch("/user/wish_list", tokenValidation, userController.addToWishList);

export default router;
