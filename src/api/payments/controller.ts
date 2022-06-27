import { User } from "../users/model";
import { Product } from "../products/model";
import { Payment } from "./model";
import { Request, Response } from "express";

export const paymentController = {
  getPayments: async (_req: Request, res: Response) => {
    try {
      const payments = await Payment.find();
      return res.status(200).json({ payments });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },
  createPayment: async (req: any, res: Response) => {
    try {
      const user = await User.findById(req.user.id).select("name, email");
      if (!user) {
        return res.status(400).json({ msg: "User doesn't exist on DB" });
      }
      const { cart, address, paymentID } = req.body;
      const { _id, name, email } = req.user;
      const newPayment = new Payment({
        user_id: _id,
        name,
        email,
        cart,
        address,
        paymentID,
      });
      cart.filter((item: any) => {
        return sold(item._id, item.quantity, item.stock, item.sold);
      });

      await newPayment.save();
      return res.status(202).json({ newPayment });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },
};
// <----------- UPDATING A PRODUCT SOLD ------------>
const sold = async (
  id: string,
  quantity: number,
  stock: number,
  oldSold: number
) => {
  await Product.findByIdAndUpdate({ _id: id }, { sold: quantity + oldSold });
  await Product.findByIdAndUpdate({ _id: id }, { stock: stock - quantity });
};
