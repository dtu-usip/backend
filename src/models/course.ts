import mongoose, { Schema } from "mongoose";
import { COURSE, GRADE } from "../utils/models";
import gradesList from "../utils/gradesList";
import Grade from "./grades";

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

courseSchema.post("save", async (doc, next) => {
  // get grades list
  gradesList.forEach(async (e) => {
    // create grades
    const grade = new Grade({
      grade: e.grade,
      course: doc._id,
      starts_from: e.starts_at,
      ends_at: e.ends_at,
    });

    await grade.save();
  });
  next();
});

courseSchema.post("remove", async (doc, next) => {
  // get grades list
  await Grade.deleteMany({ course: doc._id });
  next();
});

const Course = mongoose.model<CourseType>(COURSE, courseSchema);
export default Course;
