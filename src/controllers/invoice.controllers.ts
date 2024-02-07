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

export const updateInvoice = asyncHandler(async (req, res) => {
  const updatedInvoice = await Invoice.findByIdAndUpdate(
    req.params.invoiceId,
    {
      $set: req.body,
    },
    { new: true }
  ).populate(["customer"]);
  if (!updatedInvoice) throw new ApiError(400, "failed to update the invoice");

  res.json(
    new ApiResponse(200, updatedInvoice, "invoice updated successfully")
  );
});

export const deleteInvoice = asyncHandler(async (req, res) => {
  const deletedInvoice = await Invoice.findByIdAndDelete(req.params.invoiceId);
  if (!deletedInvoice._id)
    throw new ApiError(400, "failed to delete the invoice");
  res.json(
    new ApiResponse(
      200,
      {},
      `Invoice #${deletedInvoice.invoiceNumber} deleted successfully`
    )
  );
});

export const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.invoiceId).populate({
    path: "customer",
    populate: { path: "address" },
  });

  if (!invoice) throw new ApiError(400, "failed to fetch the api");

  res.json(new ApiResponse(200, invoice));
});
