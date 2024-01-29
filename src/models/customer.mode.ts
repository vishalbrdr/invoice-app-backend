import mongoose, { Schema } from "mongoose";
import { ADDRESS, CUSTOMER } from "../constants";

const customerSchema = new Schema(
  {
    fullName: {
      type: String,
      unique: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: ADDRESS,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Customer = mongoose.model(CUSTOMER, customerSchema);
