"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBankAccInfoData = exports.BankAccInfoSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
exports.BankAccInfoSchema = zod_1.default.object({
    accountNumber: zod_1.default.number(),
    ifsc: zod_1.default.string().min(3),
    bankName: zod_1.default.string().min(3),
    upiId: zod_1.default.string(),
});
exports.validateBankAccInfoData = (0, asyncHandler_1.asyncHandler)(async (req, _, next) => {
    const result = exports.BankAccInfoSchema.safeParse(req.body);
    if (result.success === false)
        throw new ApiError_1.ApiError(400, "validation error", result.error.errors, result.error.stack);
    next();
});
//# sourceMappingURL=bankAccInfo.middleware.js.map