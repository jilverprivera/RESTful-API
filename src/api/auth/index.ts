import express from "express";
import {check} from "express-validator";
import {authController} from "./controller";
import {emailExist} from "../../helpers";
import {validateFields} from "../../middlewares";

const router = express.Router();

router.post(
  "/signup",
  check("name", "name is required").not().isEmpty(),
  check("email", "Email is incorrect.").isEmail(),
  check("email").custom(emailExist),
  check("password", "Password must be at least 6 characters.").isLength({
    min: 6,
  }),
  check("password", "Passwords are not equals").not().equals("password2"),
  validateFields,
  authController.signup,
);

router.post(
  "/signin",
  check("email", "Email is incorrect.").isEmail(),
  check("password", "Password must be at least 6 characters.").isLength({
    min: 6,
  }),
  validateFields,
  authController.signin,
);

export default router;
