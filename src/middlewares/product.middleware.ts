import { asyncHandler } from "../utils/asyncHandler";
import Joi from "joi";
import { ApiError } from "../utils/ApiError";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  unitPrice: Joi.number().required(),
});

export const validateProductData = asyncHandler(async (req, _, next) => {
  const { error } = productSchema.validate(req.body);
  if (!error) next();
  throw new ApiError(400, error.message, error.details);
});
