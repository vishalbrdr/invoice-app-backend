import { asyncHandler } from "../utils/asyncHandler";
import Joi from "joi";
import { ApiError } from "../utils/ApiError";

export const invoiceSchema = Joi.object({
  invoiceNumber: Joi.string().min(3).max(30).required(),
  oranisation: Joi.string().required(),
  customer: Joi.string().required(),
  items: Joi.array(),
  totalAmount: Joi.number().min(1).required(),
  status: Joi.string().required(),
  invoiceDate: Joi.date().required(),
  dueDate: Joi.date().required()
});

export const validateInvoiceData = asyncHandler(async (req, _, next) => {
  const { error } = invoiceSchema.validate(req.body);
  if (!error) next();
  throw new ApiError(400, error.message, error.details);
});
