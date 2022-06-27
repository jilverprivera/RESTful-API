import { NextFunction, Response } from "express";
import { User } from "../api/users/model";

export const authAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(400).json({
      message: "First validate using Token.",
    });
  }
  const { id } = req.user;

  const user = await User.findOne({
    _id: id,
  });
  if (user) {
    if (user.role !== 1) {
      res.status(403).json({ message: "User doesn't have Admin role." });
    }
  }
  next();
};
