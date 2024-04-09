"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrganisationData = exports.OrganisationSchema = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const zod_1 = __importDefault(require("zod"));
const address_middleware_1 = require("./address.middleware");
const bankAccInfo_middleware_1 = require("./bankAccInfo.middleware");
const ApiError_1 = require("../utils/ApiError");
exports.OrganisationSchema = zod_1.default.object({
    name: zod_1.default.string().min(3).max(30),
    address: address_middleware_1.AddressSchema,
    bankAccInfo: bankAccInfo_middleware_1.BankAccInfoSchema,
    gstin: zod_1.default.string().optional(),
});
exports.validateOrganisationData = (0, asyncHandler_1.asyncHandler)(async (req, _, next) => {
    const result = exports.OrganisationSchema.safeParse(req.body);
    if (result.success === false)
        throw new ApiError_1.ApiError(400, "validation error", result.error.errors, result.error.stack);
    next();
});
//# sourceMappingURL=organisation.middleware.js.map