import { NextFunction, Request, Response } from "express";
import Grades from "../models/grades";
import Enrollment from "../models/enrollment";
import ExpressError from "../utils/ExpressError";
import mongoose from "mongoose";
import Grade from "../models/grades";

export const getGradeDashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query; // this is the course id

    // get list of grades
    const grades = await Grades.find({
      course: id,
    });

    const gradeList = await Enrollment.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(id.toString()),
        },
      },
      {
        $group: {
          _id: "$grade",
          count: { $sum: 1 },
        },
      },
    ]);

    const arr = [];

    for (const grade of grades) {
      let count = 0;
      for (const e of gradeList) {
        if (e?._id?.toString() === grade?._id?.toString()) {
          count = e?.count;
          break;
        }
      }
      arr.push({
        grade,
        count,
      });
    }

    res.status(200).json({
      grades: arr,
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};

export const saveGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const grades = req.body;

    grades.forEach(async (e) => {
      await Grade.findByIdAndUpdate(e.grade._id, {
        moderation: e.grade.moderation,
        ends_at: e.grade.ends_at,
        start_from: e.grade.starts_from,
      });
    });

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};
