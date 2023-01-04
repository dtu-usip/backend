import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, SESSION } from "../../utils/models";

export interface SessionType extends Document {
  user: ObjectId;
  device?: string;
  city?: string;
  ip?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    device: {
      type: String,
      required: true,
      enum: ["phone", "desktop", "tv", "tablet", "car", "bot"],
    },
    ip: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Session = model<SessionType>(SESSION, SessionSchema);
export default Session;
