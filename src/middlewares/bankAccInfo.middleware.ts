import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { UPI_ID_PATTERN } from "../constants";

export const bankAccInfoSchema = Joi.object({
  accountNumber: Joi.number().required(),
  ifsc: Joi.string().min(3).required(),
  bankName: Joi.string().min(3).required(),
  upiId: Joi.string().pattern(UPI_ID_PATTERN).required(),
});

export const validateAddressData = asyncHandler(async (req, _, next) => {
  const { error } = bankAccInfoSchema.validate(req.body);
  if (!error) next();
  throw new ApiError(400, error.message, error.details);
});
