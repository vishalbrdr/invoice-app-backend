import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { addressSchema } from "./address.middleware";

export const customerSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  address: addressSchema,
});

export const validateCustomerSchema = asyncHandler(async (req, _, next) => {
  const { error } = customerSchema.validate(req.body);
  if (!error) next();
  throw new ApiError(400, error.message, error.details);
});
