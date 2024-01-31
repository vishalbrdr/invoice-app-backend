import mongoose, { Schema } from "mongoose";
import {
  CUSTOMER,
  INVOICE,
  INVOICE_STATUS_ENUM,
  ORGANISATION,
  PRODUCT,
} from "../constants";

export const invoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    organisation: {
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
      enum: INVOICE_STATUS_ENUM,
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
