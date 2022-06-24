import { User } from "../models";

export const emailExist = async (email: string) => {
  const emailDB = await User.findOne({ email });

  if (emailDB) {
    throw new Error(`The email: ${email} already exist on DB`);
  }
};
