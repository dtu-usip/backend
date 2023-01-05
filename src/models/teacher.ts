import mongoose, { Schema, Types } from "mongoose";
import { TEACHER, USER } from "../utils/models";

export interface TeacherType extends mongoose.Document {
  faculty_id: number;
  m_name: string;
  address: string;
  phone: string;
  dept_code: string;
  emp_code: string;
  title: string;
  designation: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const teacherSchema = new Schema(
  {
    faculty_id: {
      type: Number,
    },
    m_name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    dept_code: {
      type: String,
    },
    emp_code: {
      type: String,
    },
    title: {
      type: String,
    },
    designation: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
  },
  { timestamps: true }
);

const teacher = mongoose.model<TeacherType>(TEACHER, teacherSchema);
export default teacher;
