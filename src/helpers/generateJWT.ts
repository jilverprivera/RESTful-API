import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { ACCESS_TOKEN_SECRET_SEED } = process.env;

export const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      String(ACCESS_TOKEN_SECRET_SEED),
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          reject("The token could not be created correctly");
        } else {
          resolve(token);
        }
      }
    );
  });
};
