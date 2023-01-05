import mongoose, { Schema, Types } from "mongoose";
import { COURSE, ENROLLMENT, PAYMENT, SEMESTER, USER } from "../utils/models";

export interface EnrollmentType extends mongoose.Document {
  course: Types.ObjectId;
  user: Types.ObjectId;
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
  },
  { timestamps: true }
);

const Enrollment = mongoose.model<EnrollmentType>(ENROLLMENT, enrollmentSchema);
export default Enrollment;
