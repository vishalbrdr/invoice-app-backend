import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { ApiError } from "../utils/ApiError";

export const ProductSchema = z.object({
  name: z.string().min(3).max(30),
  unitPrice: z.number().min(1),
});

export type ProductType = z.infer<typeof ProductSchema>;

export const validateProductData = asyncHandler(async (req, _, next) => {
  const result = ProductSchema.safeParse(req.body);

  if (result.success === false)
    throw new ApiError(
      400,
      "validation error",
      result.error.errors,
      result.error.stack
    );

  next();
});
