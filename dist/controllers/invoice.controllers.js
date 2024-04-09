"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoice = exports.deleteInvoice = exports.updateInvoice = exports.createNewInvoice = void 0;
const invoice_model_1 = require("../models/invoice.model");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.createNewInvoice = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const newInvoice = await invoice_model_1.Invoice.create(req.body);
    if (!newInvoice)
        throw new ApiError_1.ApiError(400, "failed to create newInvoice");
    return res.json(new ApiResponse_1.ApiResponse(200, newInvoice, "invoice created successfully"));
});
exports.updateInvoice = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const updatedInvoice = await invoice_model_1.Invoice.findByIdAndUpdate(req.params.invoiceId, {
        $set: req.body,
    }, { new: true }).populate(["customer"]);
    if (!updatedInvoice)
        throw new ApiError_1.ApiError(400, "failed to update the invoice");
    res.json(new ApiResponse_1.ApiResponse(200, updatedInvoice, "invoice updated successfully"));
});
exports.deleteInvoice = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const deletedInvoice = await invoice_model_1.Invoice.findByIdAndDelete(req.params.invoiceId);
    if (!deletedInvoice._id)
        throw new ApiError_1.ApiError(400, "failed to delete the invoice");
    res.json(new ApiResponse_1.ApiResponse(200, {}, `Invoice #${deletedInvoice.invoiceNumber} deleted successfully`));
});
exports.getInvoice = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const invoice = await invoice_model_1.Invoice.findById(req.params.invoiceId).populate({
        path: "customer",
        populate: { path: "address" },
    });
    if (!invoice)
        throw new ApiError_1.ApiError(400, "failed to fetch the api");
    res.json(new ApiResponse_1.ApiResponse(200, invoice));
});
//# sourceMappingURL=invoice.controllers.js.map