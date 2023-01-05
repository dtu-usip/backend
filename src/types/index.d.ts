import { UserType } from "../models/auth/user";
import { SessionType } from "../models/auth/session";
import { TokenType } from "../models/auth/token";

declare global {
  namespace Express {
    interface Request {
      device?: any;
      custom_session?: SessionType;
      token?: TokenType;
      user?: UserType;
    }
  }
}
