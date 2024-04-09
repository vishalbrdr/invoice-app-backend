"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInvoiceData = exports.InvoiceSchema = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const zod_1 = __importDefault(require("zod"));
const constants_1 = require("../constants");
const customer_middleware_1 = require("./customer.middleware");
exports.InvoiceSchema = zod_1.default.object({
    invoiceNumber: zod_1.default.string().min(3).max(30),
    oranisation: zod_1.default.string(),
    customer: zod_1.default.string() || customer_middleware_1.CustomerSchema,
    items: zod_1.default.array(zod_1.default.object({
        name: zod_1.default.string(),
        unitPrice: zod_1.default.number(),
        quantity: zod_1.default.number(),
    })),
    totalAmount: zod_1.default.number().min(1),
    status: zod_1.default.enum(constants_1.INVOICE_STATUS_ENUM),
    invoiceDate: zod_1.default.date(),
    dueDate: zod_1.default.date(),
});
exports.validateInvoiceData = (0, asyncHandler_1.asyncHandler)(async (req, _, next) => {
    const result = exports.InvoiceSchema.safeParse(req.body);
    if (result.success === false)
        throw new ApiError_1.ApiError(400, "validation error", result.error.errors, result.error.stack);
    next();
});
//# sourceMappingURL=invoice.middleware.js.map