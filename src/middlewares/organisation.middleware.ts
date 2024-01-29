import { asyncHandler } from "../utils/asyncHandler";
import Joi from "joi";
import { userSchema } from "./user.middleware";
import { addressSchema } from "./address.middleware";
import { bankAccInfoSchema } from "./bankAccInfo.middleware";
import { ApiError } from "../utils/ApiError";

export const organisationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  owner: userSchema.required(),
  address: addressSchema,
  bankAccInfo: bankAccInfoSchema,
  gstin: Joi.string().optional(),
});

export const validateOrganisationData = asyncHandler(async (req, _, next) => {
  const { error } = organisationSchema.validate(req.body);
  if (!error) next();
  throw new ApiError(400, error.message, error.details);
});
