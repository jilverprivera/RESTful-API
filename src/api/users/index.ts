import express from "express";

import {userController} from "./controller";
import {authAdmin, tokenValidation} from "../../middlewares";

const router = express.Router();

router.route("/users").get(tokenValidation, authAdmin, userController.getUsers);

router
  .route("/user/:id")
  .put(tokenValidation, authAdmin, userController.updateUserByID)
  .delete(tokenValidation, authAdmin, userController.removeUserByID);

router.get("/user/info", tokenValidation, userController.getUserInformation);
router.get("/user/re_new", tokenValidation, userController.reValidateToken);
router.patch("/user/add_cart", tokenValidation, userController.addToCartList);
router.patch("/user/wish_list", tokenValidation, userController.addToWishList);

export default router;
