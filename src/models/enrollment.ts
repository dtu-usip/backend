import mongoose, { Schema, Types } from "mongoose";
import { COURSE, PAYMENT, SEMESTER, USER } from "../utils/models";

export interface EnrollmentType extends mongoose.Document {
  course_id: Types.ObjectId;
  user_id: Types.ObjectId;
  mte_score: number;
  ete_score: number;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema(
  {
    course_id: {
      type: Schema.Types.ObjectId,
      ref: COURSE,
      required: true,
    },
    user_id: {
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

const Enrollment = mongoose.model<EnrollmentType>(PAYMENT, enrollmentSchema);
export default Enrollment;
