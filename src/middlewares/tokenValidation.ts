import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models";

dotenv.config();
const { ACCESS_TOKEN_SECRET_SEED } = process.env;

export type userJWT = {
  uid: string | JwtPayload;
};

export const tokenValidation = async (req: any, res: any, next: any) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Invalid token authentication" });
  }
  try {
    const { uid }: any = jwt.verify(token, String(ACCESS_TOKEN_SECRET_SEED));

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error on DB, call an administrator." });
  }
};
