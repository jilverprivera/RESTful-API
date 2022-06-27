import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../users/model";
import { generateJWT } from "../../helpers";
import { SignInInterface, SignUpInterface } from "../../interfaces/auth";

export const authController = {
  signup: async (req: Request, res: Response) => {
    const { name, email, password }: SignUpInterface = req.body;
    try {
      const newUser = new User({ name, email, password });
      newUser.password = await bcrypt.hash(password, 10);
      await newUser.save();
      const token = await generateJWT(String(newUser._id));
      return res.status(201).json({
        message: `User with email: ${email} has been created successfully.`,
        token,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator.", err });
    }
  },

  signin: async (req: Request, res: Response) => {
    const { email, password }: SignInInterface = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "The user is not at the DB." });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ message: "User or password aren't correct." });
      }
      const token = await generateJWT(String(user._id));
      return res.status(200).json({ user, token });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator.", err });
    }
  },
};
