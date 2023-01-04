import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, SESSION, TOKEN } from "../../utils/models";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";

export interface TokenType extends Document {
  token: string;
  user: ObjectId;
  session: ObjectId;
  expiresAt: Date;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const TokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: SESSION,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: ACCESS_TOKEN,
      enum: [ACCESS_TOKEN, REFRESH_TOKEN],
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = model<TokenType>(TOKEN, TokenSchema);
export default Token;
