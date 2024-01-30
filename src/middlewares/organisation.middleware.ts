import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { UserSchema } from "./user.middleware";
import { AddressSchema } from "./address.middleware";
import { BankAccInfoSchema } from "./bankAccInfo.middleware";
import { ApiError } from "../utils/ApiError";

export const OrganisationSchema = z.object({
  name: z.string().min(3).max(30),
  owner: UserSchema,
  address: AddressSchema,
  bankAccInfo: BankAccInfoSchema,
  gstin: z.string().optional(),
});

export type OrganisationType = z.infer<typeof OrganisationSchema>;

export const validateOrganisationData = asyncHandler(async (req, _, next) => {
  const result = OrganisationSchema.safeParse(req.body);

  if (result.success === false)
    throw new ApiError(
      400,
      "validation error",
      result.error.errors,
      result.error.stack
    );

  next();
});
