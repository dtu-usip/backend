import mongoose, { Schema } from "mongoose";
import { USER } from "../../utils/models";

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
      enum: [0, 1], // 0 -> student, 1 -> staff
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

const User = mongoose.model<UserType>(USER, userSchema);
export default User;