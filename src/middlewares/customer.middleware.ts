import z from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { AddressSchema } from "./address.middleware";
import { isValidObjectId } from "../utils/isValidObjectId";

export const CustomerSchema = z.object({
  fullName: z.string().min(3).max(30),
  email: z.string().email(),
  address: AddressSchema,
});

export type CustomerType = z.infer<typeof CustomerSchema>;

export const validateCustomerSchema = asyncHandler(async (req, _, next) => {
  const { orgId } = req.params;

  if (!isValidObjectId(orgId)) {
    throw new ApiError(400, "invalid organisation id");
  }

  const result = CustomerSchema.safeParse(req.body);

  if (result.success === false)
    throw new ApiError(
      400,
      "validation error",
      result.error.errors,
      result.error.stack
    );

  next();
});
