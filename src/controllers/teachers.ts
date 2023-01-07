import { NextFunction, Request, Response } from "express";
import Enrollment, { EnrollmentType } from "../models/enrollment";
import ExpressError from "../utils/ExpressError";

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const courses: EnrollmentType[] = await Enrollment.find({
      user: user._id,
    }).populate("course");

    res.status(200).json({
      courses,
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
  }
};
