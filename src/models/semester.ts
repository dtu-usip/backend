import mongoose, { Schema } from "mongoose";
import { SEMESTER } from "../utils/models";

export interface SemesterType extends mongoose.Document {
  year: string;
  type: SEM_TYPE;
  number: number;
}

enum SEM_TYPE {
  EVEN = "even",
  ODD = "odd",
}

const semesterSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  type: {
    type: SEM_TYPE,
    required: true,
  },
  number: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
  },
});

const semester = mongoose.model<SemesterType>(SEMESTER, semesterSchema);
export default semester;
