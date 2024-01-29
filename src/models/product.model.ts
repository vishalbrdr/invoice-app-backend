import mongoose, { Schema } from "mongoose";
import { PRODUCT } from "../constants";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model(PRODUCT, productSchema);
