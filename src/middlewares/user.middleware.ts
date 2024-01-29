import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
});

export const validateUserSchema = asyncHandler(async (req, _, next) => {
  const { error } = userSchema.validate(req.body);
  if (!error) next();
  throw new ApiError(400, error.message, error.details);
});
