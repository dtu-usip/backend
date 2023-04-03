import mongoose, { Schema, Types } from "mongoose";
import { COURSE, ENROLLMENT, GRADE, SEMESTER, USER } from "../utils/models";

export interface EnrollmentType extends mongoose.Document {
  course: Types.ObjectId;
  user: Types.ObjectId;
  cws_score: number;
  prs_score: number;
  mte_score: number;
  ete_score: number;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: COURSE,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    cws_score: {
      type: Number,
    },
    prs_score: {
      type: Number,
    },
    mte_score: {
      type: Number,
    },
    ete_score: {
      type: Number,
    },
    semester: {
      type: Schema.Types.ObjectId,
      ref: SEMESTER,
      required: true,
    },
    grade: {
      type: Schema.Types.ObjectId,
      ref: GRADE,
    },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model<EnrollmentType>(ENROLLMENT, enrollmentSchema);
export default Enrollment;
