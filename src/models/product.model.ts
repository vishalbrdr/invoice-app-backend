import mongoose, { Schema } from "mongoose";
import { ORGANISATION, PRODUCT } from "../constants";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowerCase: true,
    },
    unitPrice: {
      type: String,
      required: true,
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: ORGANISATION,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: 1, organisation: 1 }, { unique: true });

export const Product = mongoose.model(PRODUCT, productSchema);
