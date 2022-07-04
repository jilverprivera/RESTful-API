import {Request, Response} from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import {generateJWT} from "../../helpers";
import {User} from "./model";
import {Payment} from "../payments/model";
dotenv.config();

const {ACCESS_TOKEN_SECRET_SEED} = process.env;

export const userController = {
  reValidateToken: async (req: Request, res: Response) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({message: "No token"});
    }
    try {
      const {uid}: any = await jwt.verify(
        token,
        String(ACCESS_TOKEN_SECRET_SEED),
      );
      if (!uid) {
        return res.status(400).json({message: "Error with token generation."});
      }
      const newToken = await generateJWT(uid);
      return res.json({newToken});
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  getUsers: async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(200).json({message: "No users on DB yet."});
      }
      return res.status(200).json(users);
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  getUserInformation: async (req: any, res: Response) => {
    try {
      const {id} = req.user;
      const user = await User.findById(id);
      const history = await Payment.find({user_id: req.user.id});
      if (!user) {
        return res
          .status(400)
          .json({message: `User with ID ${id} doesn't exist on DB.`});
      }
      return res.status(200).json({user, payments: history});
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  updateUserByID: async (req: Request, res: Response) => {
    try {
      const state = req.body;
      const userToUpdate = await User.findByIdAndUpdate(
        {_id: req.params.id},
        {...state},
      );
      if (!userToUpdate) {
        return res
          .status(404)
          .json({message: `User with ID: ${req.params.id} not found on DB.`});
      }
      return res.status(200).json({
        message: `Information of user with ID ${req.params.id} updated succesfully.`,
      });
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  removeUserByID: async (req: Request, res: Response) => {
    try {
      const userToRemove = await User.findByIdAndRemove(req.params.id);
      if (!userToRemove) {
        return res
          .status(400)
          .json({message: `User with ID: ${req.params.id} not found on DB.`});
      }
      return res.status(200).json({
        message: `User with ID: ${req.params.id} removed succesfully.`,
      });
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  addToCartList: async (req: any, res: Response) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({message: "User doesn't exist."});
      }
      await User.findByIdAndUpdate(
        {_id: req.user.id},
        {
          cart: req.body.cart,
        },
      );
      return res.json({message: "Added to cart"});
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  addToWishList: async (req: any, res: Response) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({message: "User doesn't exist."});
      }
      await User.findByIdAndUpdate(
        {_id: req.user.id},
        {
          wish: req.body.wish,
        },
      );
      return res.status(200).json({message: "Added item to wish list"});
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  getHistoryPayment: async (req: any, res: Response) => {
    try {
      const history = await Payment.find({user_id: req.user.id});
      return res.status(200).json({history});
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },
};
