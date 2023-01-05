import mongoose, { Schema, Types } from "mongoose";
import { PAYMENT, USER } from "../utils/models";

export interface PaymentType extends mongoose.Document {
  bank_account_number: string;
  bank_ifsc: string;
  bank_name: string;
  pan: string;
  url: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const payemntSchema = new Schema(
  {
    bank_account_number: {
      type: String,
      required: true,
    },
    bank_ifsc: {
      type: String,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
  },
  { timestamps: true }
);

const payment = mongoose.model<PaymentType>(PAYMENT, payemntSchema);
export default payment;
