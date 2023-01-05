import { NextFunction, Request, Response } from "express";
import Enrollment, { EnrollmentType } from "../models/enrollment";
import ExpressError from "../utils/ExpressError";

// Inefficient pagination is used
// skip-limit used due to shortage of time
// cursor based pagination can be implemented

export const studentList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageNumber = 0, resultsPerPage = 50 } = req.query;

    const results = parseInt(resultsPerPage.toString() ?? "10", 10);
    const page = parseInt(pageNumber.toString() ?? "0", 10);

    // Get all students

    // Query can be better
    // to get ONLY students
    const students: EnrollmentType[] = await Enrollment.find()
      .populate({
        path: "user",
        match: {
          role: "student",
        },
        strictPopulate: true,
      })
      .populate("course")
      .sort({ _id: 1 })
      .skip(page > 0 ? (page - 1) * results : 0)
      .limit(results);

    res.status(200).json({
      students: students.filter((e) => e.user !== null),
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
  }
};

export const studentsInCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageNumber = 0, resultsPerPage = 50, courseId } = req.query;

    const results = parseInt(resultsPerPage.toString() ?? "10", 10);
    const page = parseInt(pageNumber.toString() ?? "0", 10);

    const students: EnrollmentType[] = await Enrollment.find({
      course: courseId,
    })
      .populate([
        {
          path: "user",
          match: {
            role: "student",
          },
          strictPopulate: true,
        },
      ])
      .sort({ _id: 1 })
      .skip(page > 0 ? (page - 1) * results : 0)
      .limit(results);

    res.status(200).json({
      students: students.filter((e) => e.user !== null),
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
  }
};
