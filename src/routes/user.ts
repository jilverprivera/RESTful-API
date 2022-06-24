import express from "express";
import { userController } from "../controllers";

// import { emailExist } from "../helpers";
// import { authController } from "../controllers/auth";
// import { validateFields } from "../middlewares";

const router = express.Router();

// router.post(
//   "/auth/admin/register",
//   check("name", "name is required").not().isEmpty(),
//   check("email", "Email is incorrect.").isEmail(),
//   check("email").custom(emailExist),
//   check("password", "Password must be at least 6 characters.").isLength({
//     min: 6,
//   }),
//   check("password", "Passwords are not equals").equals("password2"),
//   // TokenJWTValidate,
//   // authAdmin,
//   validateFields,
//   authController.admin_register
// );

router.get("/", userController.getUsers);

export default router;
