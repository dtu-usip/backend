import { NextFunction, Request, Response } from "express";
import Enrollment, { EnrollmentType } from "../models/enrollment";
import ExpressError from "../utils/ExpressError";

export const viewGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;

    const enrollments: EnrollmentType[] = await Enrollment.find({
      user_id: id,
    }).populate([
      {
        path: "user",
        match: {
          role: "student",
        },
        strictPopulate: true,
      },
      "course",
    ]);

    res.status(200).json({
      grades: enrollments.filter((e) => e.user !== null),
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};

// Idk the meaning of this
// I'm just sending enrollments again
// Can be handled on the frontend ig
export const totalNumberOfGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;

    const enrollments: EnrollmentType[] = await Enrollment.find({
      user_id: id,
    }).populate([
      {
        path: "user",
        match: {
          role: "student",
        },
        strictPopulate: true,
      },
      "course",
    ]);

    res.status(200).json({
      grades: enrollments.filter((e) => e.user !== null),
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};

export const addGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course_id, user_id, mte_score, ete_score } = req.body;

    const enrollment: EnrollmentType = await Enrollment.findOne({
      course: course_id,
      user: user_id,
    });

    enrollment.mte_score = mte_score;
    enrollment.ete_score = ete_score;

    await enrollment.save();

    res.status(200).json({
      enrollment,
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};

export const updateGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course_id, user_id, mte_score, ete_score } = req.body;

    const enrollment: EnrollmentType = await Enrollment.findOne({
      course: course_id,
      user: user_id,
    });

    enrollment.mte_score = mte_score;
    enrollment.ete_score = ete_score;

    await enrollment.save();

    res.status(200).json({
      enrollment,
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};

export const removeGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course_id, user_id } = req.query;

    const enrollment: EnrollmentType = await Enrollment.findOne({
      course_id,
      user_id,
    });

    enrollment.mte_score = null;
    enrollment.ete_score = null;

    await enrollment.save();

    res.status(200).json({
      enrollment,
    });
  } catch (e) {
    console.log("There was an error>> ", e);
    next(new ExpressError("There was an error", 500, e));
    return;
  }
};
