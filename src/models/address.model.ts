import mongoose, { Schema } from "mongoose";
import { ADDRESS } from "../constants";

const addressSchema = new Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: String,
  },
});

export const Address = mongoose.model(ADDRESS, addressSchema);
