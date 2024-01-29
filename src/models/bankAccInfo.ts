import mongoose, { Schema } from "mongoose";
import { BANK_ACC_INFO } from "../constants";

const bankAccInfoSchema = new Schema({
  accountNumber: {
    type: Number,
    required: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  upiId: {
    type: String,
  },
});

export const BankAccInfo = mongoose.model(BANK_ACC_INFO, bankAccInfoSchema);
