import z from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const UserSchema = z.object({
  fullName: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const validateUserSchema = asyncHandler(async (req, _, next) => {
  const result = UserSchema.safeParse(req.body);

  if (result.success === false)
    throw new ApiError(
      400,
      "validation error",
      result.error.errors,
      result.error.stack
    );

  next();
});
