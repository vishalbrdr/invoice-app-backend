import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ProductSchema } from "./product.middleware";
import z from "zod";
import { INVOICE_STATUS_ENUM } from "../constants";

export const InvoiceSchema = z.object({
  invoiceNumber: z.string().min(3).max(30),
  oranisation: z.string(),
  customer: z.string(),
  items: z.array(ProductSchema),
  totalAmount: z.number().min(1),
  status: z.enum(INVOICE_STATUS_ENUM),
  invoiceDate: z.date(),
  dueDate: z.date(),
});

export const validateInvoiceData = asyncHandler(async (req, _, next) => {
  const result = InvoiceSchema.safeParse(req.body);

  if (result.success === false)
    throw new ApiError(
      400,
      "validation error",
      result.error.errors,
      result.error.stack
    );

  next();
});
