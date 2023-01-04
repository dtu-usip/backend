import mongoose, { Schema } from "mongoose";
import { COURSE } from "../utils/models";

export interface CourseType extends mongoose.Document {
  course: string;
  lab_grades: any[];
  hw_grades: any[];
  students: any[];
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
    lab_grades: {
      type: Array,
      required: true,
    },
    hw_grades: {
      type: Array,
      required: true,
    },
    students: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const course = mongoose.model<CourseType>(COURSE, courseSchema);
export default course;
