"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorised = exports.isAuthenticated = void 0;
const user_model_1 = require("../models/user.model");
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const organisation_model_1 = require("../models/organisation.model");
const isValidObjectId_1 = require("../utils/isValidObjectId");
exports.isAuthenticated = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        if (!token)
            throw new ApiError_1.ApiError(401, "Unauthorized request");
        const decodedToken = (jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET));
        // console.log(decodedToken);
        const user = await user_model_1.User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user)
            throw new ApiError_1.ApiError(401, "Invalid Access Token");
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError_1.ApiError(401, error?.message || "invalid token");
    }
});
exports.isAuthorised = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { _id: userId } = req.body;
    const { orgId: organisationId } = req.params;
    if (!(0, isValidObjectId_1.isValidObjectId)(organisationId))
        throw new ApiError_1.ApiError(400, "invalid organisation id", [
            "invalid organisation id",
        ]);
    const organisation = await organisation_model_1.Organisation.findById(organisationId);
    if (organisation?.owner === userId)
        return res.json(organisation);
    next();
});
//# sourceMappingURL=auth.middlewares.js.map