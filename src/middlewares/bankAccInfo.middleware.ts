import z from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const BankAccInfoSchema = z.object({
  accountNumber: z.number(),
  ifsc: z.string().min(3),
  bankName: z.string().min(3),
  upiId: z.string(),
});

export const validateBankAccInfoData = asyncHandler(async (req, _, next) => {
  const result = BankAccInfoSchema.safeParse(req.body);

  if (result.success === false)
    throw new ApiError(
      400,
      "validation error",
      result.error.errors,
      result.error.stack
    );

  next();
});
