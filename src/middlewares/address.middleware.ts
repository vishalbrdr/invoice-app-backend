import z from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const AddressSchema = z.object({
  street: z.string().min(3),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

export const validateAddressData = asyncHandler(async (req, _, next) => {
  const result = AddressSchema.safeParse(req.body);

  if (result.success === false)
    throw new ApiError(
      400,
      "validation error",
      result.error.errors,
      result.error.stack
    );

  next();
});
