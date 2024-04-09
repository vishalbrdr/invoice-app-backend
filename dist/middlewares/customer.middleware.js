"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomerSchema = exports.CustomerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const address_middleware_1 = require("./address.middleware");
const isValidObjectId_1 = require("../utils/isValidObjectId");
exports.CustomerSchema = zod_1.default.object({
    fullName: zod_1.default.string().min(3).max(30),
    email: zod_1.default.string().email(),
    address: address_middleware_1.AddressSchema,
});
exports.validateCustomerSchema = (0, asyncHandler_1.asyncHandler)(async (req, _, next) => {
    const { orgId } = req.params;
    if (!(0, isValidObjectId_1.isValidObjectId)(orgId)) {
        throw new ApiError_1.ApiError(400, "invalid organisation id");
    }
    const result = exports.CustomerSchema.safeParse(req.body);
    if (result.success === false)
        throw new ApiError_1.ApiError(400, "validation error", result.error.errors, result.error.stack);
    next();
});
//# sourceMappingURL=customer.middleware.js.map