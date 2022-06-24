import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models";

dotenv.config();
const { ACCESS_TOKEN_SECRET_SEED } = process.env;

export const TokenJWTValidate = async (req: any, res: any, next: any) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, msg: "Invalid token authentication" });
  }
  try {
    const uid = jwt.verify(token, String(ACCESS_TOKEN_SECRET_SEED));

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({ ok: false, msg: "Invalid token" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Error on DB, call an administrator." });
  }
};
