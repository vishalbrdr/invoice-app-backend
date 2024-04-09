"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddressData = exports.AddressSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
exports.AddressSchema = zod_1.default.object({
    street: zod_1.default.string().min(3),
    city: zod_1.default.string(),
    state: zod_1.default.string(),
    country: zod_1.default.string(),
    postalCode: zod_1.default.string(),
});
exports.validateAddressData = (0, asyncHandler_1.asyncHandler)(async (req, _, next) => {
    const result = exports.AddressSchema.safeParse(req.body);
    if (result.success === false)
        throw new ApiError_1.ApiError(400, "validation error", result.error.errors, result.error.stack);
    next();
});
//# sourceMappingURL=address.middleware.js.map