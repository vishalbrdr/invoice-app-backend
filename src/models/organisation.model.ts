import mongoose, { Schema } from "mongoose";
import { ADDRESS, ORGANISATION, USER } from "../constants";

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
  },
  { timestamps: true }
);

export const Organisation = mongoose.model(ORGANISATION, organisationSchema);
