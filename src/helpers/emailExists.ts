import { User } from "../api/users/model";

export const emailExist = async (email: string) => {
  const emailDB = await User.findOne({ email });

  if (emailDB) {
    throw new Error(`The email: ${email} already exist on DB`);
  }
};
