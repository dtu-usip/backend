import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";

export const viewGrades = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
  }
};

export const totalNumberOfGrades = (
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

export const addGrade = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
  }
};

export const updateGrade = (
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

export const removeGrade = (
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
