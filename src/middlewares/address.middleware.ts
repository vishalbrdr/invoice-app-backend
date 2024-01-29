import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const addressSchema = Joi.object({
  street: Joi.string().min(3).required(),
  city: Joi.string().min(3).required(),
  state: Joi.string().min(3).required(),
  country: Joi.string().min(3).required(),
  postalCode: Joi.string().min(3).required(),
});

export const validateAddressData = asyncHandler(async (req, _, next) => {
  const { error } = addressSchema.validate(req.body);
  if (!error) next();
  throw new ApiError(400, error.message, error.details);
});
