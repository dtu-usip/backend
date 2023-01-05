import mongoose, { Schema, Types } from "mongoose";
import { STUDENT, USER } from "../utils/models";

export interface StudentType extends mongoose.Document {
  student_id: number;
  reg_dtu: string;
  req_year: string;
  req_group: string;
  req_id: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema(
  {
    student_id: {
      type: Number,
    },
    reg_dtu: {
      type: String,
      enum: ["DTU"],
    },
    req_year: {
      type: Number,
    },
    req_group: {
      type: String,
    },
    reg_id: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model<StudentType>(STUDENT, studentSchema);
export default Student;
