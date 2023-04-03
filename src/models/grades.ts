import mongoose, { Schema } from "mongoose";
import { COURSE, GRADE } from "../utils/models";

export interface GradeType extends mongoose.Document {
  course: string;
  createdAt: Date;
  updatedAt: Date;
}

const gradeSchema = new Schema(
  {
    grade: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: COURSE,
      required: true,
    },
    starts_from: {
      type: Number,
      required: true,
    },
    ends_at: {
      type: Number,
      required: true,
    },
    moderation: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Grade = mongoose.model<GradeType>(GRADE, gradeSchema);
export default Grade;
