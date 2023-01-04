import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";

export const studentList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
  }
};

export const studentsInCourse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
  }
};
