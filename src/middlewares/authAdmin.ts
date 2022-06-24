import { NextFunction, Response } from "express";
import { User } from "../models";

export const authAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(500).json({
      message: "First validate using Token.",
    });
  }
  const { name, id } = req.user;

  const user = await User.findOne({
    _id: id,
  });
  if (user) {
    if (user.role !== 1) {
      res
        .status(400)
        .json({ ok: false, message: `User ${name} doesn't have Admin role.` });
    }
  }
  next();
};
