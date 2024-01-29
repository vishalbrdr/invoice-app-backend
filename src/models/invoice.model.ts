import mongoose, { Schema } from "mongoose";
import { CUSTOMER, INVOICE, ORGANISATION, PRODUCT } from "../constants";

export const invoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    oranisation: {
      type: Schema.Types.ObjectId,
      ref: ORGANISATION,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: CUSTOMER,
    },
    items: {
      type: [
        {
          product: { type: Schema.Types.ObjectId, ref: PRODUCT },
          quantity: Number,
        },
      ],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PENDING", "PAID"],
    },
    invoiceDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model(INVOICE, invoiceSchema);
