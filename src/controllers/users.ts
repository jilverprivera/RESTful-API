import { Request, Response } from "express";
import { User, Payment } from "../models";

export const userController = {
  getUsers: async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  getUserByID: async (req: any, res: Response) => {
    try {
      const { id } = req.user;
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ message: "User doesn't exist." });
      }
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  updateUserByID: async (req: Request, res: Response) => {
    try {
      const { state } = req.body;
      await User.findByIdAndUpdate({ _id: req.params.id }, { state });
      return res.status(200).json({
        message: `Information with ID ${req.params.id} changed to: ${state}`,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  removeUserByID: async (req: Request, res: Response) => {
    try {
      await User.findByIdAndRemove(req.params.id);
      return res.status(200).json({
        message: `User with ${req.params.id} removed succesfully.`,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  addToCartList: async (req: any, res: Response) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ message: "User doesn't exist." });
      }
      await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res.json({ message: "Added to cart" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  addToWishList: async (req: any, res: Response) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ message: "User doesn't exist." });
      }
      await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          wish: req.body.wish,
        }
      );
      return res.status(200).json({ message: "Added item to wish list" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  getHistoryPayment: async (req: any, res: Response) => {
    try {
      const history = await Payment.find({ user_id: req.user.id });

      return res.status(200).json({ history });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },
};
