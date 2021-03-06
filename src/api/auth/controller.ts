import {Request, Response} from "express";
import bcrypt from "bcrypt";

import {User} from "../users/model";
import {generateJWT} from "../../helpers";
import {SignInInterface, SignUpInterface} from "../../interfaces/auth";

export const authController = {
  signup: async (request: Request, response: Response) => {
    const {name, email, password}: SignUpInterface = request.body;
    try {
      const newUser = new User({name, email, password});
      newUser.password = await bcrypt.hash(password, 15);
      const token = await generateJWT(String(newUser._id));
      await newUser.save();
      return response.status(201).json({token, user: newUser});
    } catch (err) {
      return response
        .status(500)
        .json({message: "Error on DB, call an administrator.", err});
    }
  },

  signin: async (request: Request, response: Response) => {
    const {email, password}: SignInInterface = request.body;
    try {
      const user = await User.findOne({email});
      if (!user) {
        return response.status(400).json({
          message: `The user with email: ${email} does not exist at the DB.`,
        });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return response
          .status(400)
          .json({message: "User or password aren't correct."});
      }
      const token = await generateJWT(String(user._id));
      return response.status(200).json({token});
    } catch (err) {
      return response
        .status(500)
        .json({message: "Error on DB, call an administrator.", err});
    }
  },
};
