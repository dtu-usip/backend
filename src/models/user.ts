import mongoose, { Schema } from "mongoose";
import { USER } from "../utils/constants";

export interface UserType extends mongoose.Document {
  username: string;
  password: string;
  role: number;
  courses: any[];
  phone: string;
  email: string;
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
      type: Number,
      required: true,
    },
    courses: {
      type: Array,
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
  },
  { timestamps: true }
);

const user = mongoose.model<UserType>(USER, userSchema);
export default user;
