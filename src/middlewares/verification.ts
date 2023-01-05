import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import jwt from "jsonwebtoken";

import User, { UserType } from "../models/auth/user";
import Token, { TokenType } from "../models/auth/token";
import Session, { SessionType } from "../models/auth/session";
import { SESSION } from "../utils/models";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret: string = process.env.JWT_SECRET;
  const token: any = req.headers.token;

  try {
    const tokenInDb: TokenType = await Token.findOne({
      token,
    }).populate(SESSION);
    if (!tokenInDb) {
      next(new ExpressError("Invalid Token", 400));
      return;
    }
    if (tokenInDb.session instanceof Session && !tokenInDb.session.isActive) {
      next(new ExpressError("Session inactive", 400));
      return;
    }

    const decoded: any = jwt.verify(token, secret);
    if (decoded.exp < Date.now()) {
      next(new ExpressError("Token Expired", 400));
      return;
    }
    if (!decoded.session) {
      next(new ExpressError("Session not found", 400));
      return;
    }
    if (
      tokenInDb.session instanceof Session &&
      decoded.session !== tokenInDb.session.id
    ) {
      next(new ExpressError("Invalid Session", 400));
      return;
    }

    const user: UserType = await User.findById(decoded.id);
    if (!user) {
      next(new ExpressError("User not found", 404));
      return;
    }

    req.session =
      tokenInDb.session instanceof Session
        ? (tokenInDb.session as SessionType)
        : null;
    req.token = tokenInDb;
    req.user = user;

    next();
  } catch (error) {
    console.log("error", error);
    next(new ExpressError(`You are not authorized: ${error}`, 403));
    return;
  }
};
