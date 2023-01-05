import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import { compare, hash, genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import User, { UserType } from "../models/auth/user";
import geoip from "geoip-lite";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRATION,
} from "../utils/constants";
import Token, { TokenType } from "../models/auth/token";
import Session, { SessionType } from "../models/auth/session";

const createToken = async (type: string, userId: string, sessionId: string) => {
  const secret = process.env.JWT_SECRET;
  const expireDate =
    Date.now() +
    (type === ACCESS_TOKEN
      ? ACCESS_TOKEN_EXPIRATION
      : REFRESH_TOKEN_EXPIRATION);
  const token: string = jwt.sign(
    {
      id: userId,
      session: sessionId,
      type,
    },
    secret,
    { expiresIn: expireDate }
  );

  const tokenInDb: TokenType = new Token({
    token,
    type,
    user: userId,
    expiresAt: new Date(expireDate),
    session: sessionId,
  });

  await tokenInDb.save();

  return {
    token,
    db: tokenInDb,
  };
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user: UserType = await User.findOne({
      username,
    });

    if (!user) {
      next(new ExpressError("Invalid credentials", 403));
      return;
    }

    const validPassword = compare(password, user.password);
    if (!validPassword) {
      next(new ExpressError("Invalid credentials", 403));
      return;
    }

    const response = await createSession(
      user,
      req?.device?.type?.toLowerCase(),
      req?.ip
    );

    res.status(200).json({
      success: true,
      user,
      access: response.access,
      refresh: response.refresh,
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId: string = req.custom_session._id;

    await Session.findByIdAndUpdate(sessionId, { isActive: false });

    // Delete any existing tokens
    // on the current session
    await Token.deleteMany({
      session: sessionId,
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(new ExpressError(error.toString(), 500));
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    const { password, newPassword } = req.body;
    if (password !== newPassword) {
      next(new ExpressError("Passwords don't match", 400));
      return;
    }

    const salt = await genSalt(10);
    const new_password = await hash(req.body.password, salt);

    await User.findByIdAndUpdate(userId, {
      password: new_password,
    });

    console.log("updated");

    res.status(200).json({
      success: true,
      message: "Succesfully updated password",
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};

export const updateInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?._id;
    const { email, phone } = req.body;

    await User.findByIdAndUpdate(userId, {
      email,
      phone,
    });

    res.status(200).json({
      success: true,
      message: "Succesfully updated user",
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};

export const createSession = async (
  user: UserType,
  device: string | null | undefined = "desktop",
  ip: string
) => {
  const geo = geoip.lookup(ip);
  const city = geo?.city;

  const session: SessionType = new Session({
    user: user._id,
    device,
    city,
    ip,
  });

  // Create tokens
  const access = await createToken(ACCESS_TOKEN, user._id, session._id);
  const refresh = await createToken(REFRESH_TOKEN, user._id, session._id);

  await session.save();

  return {
    access: access.token,
    refresh: refresh.token,
  };
};

export const generateTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenType = req?.token?.type;
    const userId = req?.user?._id;
    const sessionId = req?.custom_session?._id;

    if (tokenType !== ACCESS_TOKEN) {
      next(new ExpressError("Invalid Token Type", 400));
    }

    // Delete any existing tokens
    // on the current session
    await Token.deleteMany({
      session: sessionId,
    });

    // Create a new tokens
    const access = await createToken(ACCESS_TOKEN, userId, sessionId);
    const refresh = await createToken(REFRESH_TOKEN, userId, sessionId);

    res.status(200).json({
      success: true,
      access: access.token,
      refresh: refresh.token,
    });
  } catch (error) {
    next(new ExpressError(`There was an error ${error.toString()}`, 500));
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenType = req?.token?.type;
    const userId = req?.user?._id;
    const sessionId = req?.custom_session?._id;

    if (tokenType !== REFRESH_TOKEN) {
      next(new ExpressError("Invalid Token Type", 400));
    }

    // Delete any existing access tokens
    // on the current session
    await Token.deleteMany({
      session: sessionId,
      type: ACCESS_TOKEN,
    });

    // Create a new access token
    const access = await createToken(ACCESS_TOKEN, userId, sessionId);

    res.status(200).json({
      success: true,
      access: access.token,
    });
  } catch (error) {
    next(new ExpressError(`There was an error ${error.toString()}`, 500));
  }
};
