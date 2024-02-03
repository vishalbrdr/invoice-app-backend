import { Invoice } from "../models/invoice.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createNewInvoice = asyncHandler(async (req, res) => {
  const newInvoice = await Invoice.create(req.body);
  if (!newInvoice) throw new ApiError(400, "failed to create newInvoice");

  return res.json(
    new ApiResponse(200, newInvoice, "invoice created successfully")
  );
});
