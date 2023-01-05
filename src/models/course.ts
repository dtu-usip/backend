import mongoose, { Schema } from "mongoose";
import { COURSE } from "../utils/models";

export interface CourseType extends mongoose.Document {
  course: string;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema(
  {
    course: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const course = mongoose.model<CourseType>(COURSE, courseSchema);
export default course;
