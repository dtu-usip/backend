import mongoose, { Schema } from "mongoose";
import { USER } from "../../utils/models";

enum ROLE {
  STUDENT = "student",
  TEACHER = "teacher",
}

export interface UserType extends mongoose.Document {
  username: string;
  password: string;
  role: ROLE;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: ROLE,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    full_name: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserType>(USER, userSchema);
export default User;
