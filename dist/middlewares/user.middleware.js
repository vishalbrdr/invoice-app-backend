"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSchema = exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const user_model_1 = require("../models/user.model");
exports.UserSchema = zod_1.default.object({
    fullName: zod_1.default.string().min(3).max(30),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8).max(32),
});
exports.validateUserSchema = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const result = exports.UserSchema.safeParse(req.body);
    if (result.success === false)
        throw new ApiError_1.ApiError(400, "validation error", result.error.errors, result.error.stack);
    // check if email already exists
    const { email } = req.body;
    const user = await user_model_1.User.findOne({ email });
    if (user) {
        const error = "email already registred please login or use another email and try again";
        throw new ApiError_1.ApiError(400, error, [error]);
    }
    next();
});
//# sourceMappingURL=user.middleware.js.map