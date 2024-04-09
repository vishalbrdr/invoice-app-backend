"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductData = exports.ProductSchema = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const zod_1 = __importDefault(require("zod"));
const ApiError_1 = require("../utils/ApiError");
exports.ProductSchema = zod_1.default.object({
    name: zod_1.default.string().min(3).max(30),
    unitPrice: zod_1.default.number().min(1),
});
exports.validateProductData = (0, asyncHandler_1.asyncHandler)(async (req, _, next) => {
    const result = exports.ProductSchema.safeParse(req.body);
    if (result.success === false)
        throw new ApiError_1.ApiError(400, "validation error", result.error.errors, result.error.stack);
    next();
});
//# sourceMappingURL=product.middleware.js.map