import mongoose, { Schema } from "mongoose";
import { ADMIN_BRO_USER } from "../utils/models";

export interface AdminBroUserType extends mongoose.Document {
  name: string;
  email: string;
  encryptedPassword: string;
}

const adminBroUserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const adminBroUser = mongoose.model<AdminBroUserType>(
  ADMIN_BRO_USER,
  adminBroUserSchema
);
export default adminBroUser;
