import { UserInterface } from "../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
    }
  }
}
