import z from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";

export const UserSchema = z.object({
  fullName: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export type UserType = z.infer<typeof UserSchema>;

export const validateUserSchema = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = UserSchema.safeParse(req.body);

    if (result.success === false)
      throw new ApiError(
        400,
        "validation error",
        result.error.errors,
        result.error.stack
      );

    // check if email already exists
    const { email } = <UserType>req.body;

    const user = await User.findOne({ email });
    if (user) {
      const error = "email already registred please login or use another email and try again";
      return res.status(400).json(new ApiError(400, error, [error]));
    }

    next();
  }
);
