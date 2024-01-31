import mongoose, { Schema } from "mongoose";
import { ADDRESS, CUSTOMER, ORGANISATION } from "../constants";

const customerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: ADDRESS,
    },
    email: {
      type: String,
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: ORGANISATION,
      required: true,
    },
  },
  { timestamps: true }
);

export const Customer = mongoose.model(CUSTOMER, customerSchema);
