import mongoose, { Schema } from "mongoose";
import { ADDRESS, BANK_ACC_INFO, ORGANISATION, USER } from "../constants";

const organisationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: USER,
    },
    gstin: {
      type: String,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: ADDRESS,
    },
    bankAccInfo: {
      type: Schema.Types.ObjectId,
      ref: BANK_ACC_INFO,
    },
  },
  { timestamps: true }
);

export const Organisation = mongoose.model(ORGANISATION, organisationSchema);
