"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersOrganisations = exports.updateAccountDetails = exports.getCurrentUser = exports.changeCurrentPassword = exports.refreshAccessToken = exports.logoutUser = exports.loginUser = exports.registerUser = exports.generateAccessAndRefreshTokens = void 0;
const user_model_1 = require("../models/user.model");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await user_model_1.User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, "Something went wrong while generating access token");
    }
};
exports.generateAccessAndRefreshTokens = generateAccessAndRefreshTokens;
exports.registerUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await user_model_1.User.create(req.body);
    if (!user)
        return res.status(500).json(new ApiError_1.ApiError(500, "unable to create user"));
    const { accessToken, refreshToken } = await (0, exports.generateAccessAndRefreshTokens)(user._id);
    const loggedInUser = await user_model_1.User.findById(user._id).select("-password -refreshToken");
    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse_1.ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
    }, "User registered Successfully"));
});
exports.loginUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        throw new ApiError_1.ApiError(400, "username/email and password is required");
    }
    const user = await user_model_1.User.findOne({ email });
    if (!user?._id)
        return res.status(404).json(new ApiError_1.ApiError(404, "user not found"));
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid)
        throw new ApiError_1.ApiError(401, "incorrect password, please try again");
    const { accessToken, refreshToken } = await (0, exports.generateAccessAndRefreshTokens)(user._id);
    const loggedInUser = await user_model_1.User.findById(user._id).select("-password -refreshToken");
    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse_1.ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
    }, "User logged In Successfully"));
});
exports.logoutUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await user_model_1.User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1,
        },
    }, {
        new: true,
    });
    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse_1.ApiResponse(200, {}, "user logged out successfully"));
});
exports.refreshAccessToken = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            return res
                .status(401)
                .json(new ApiError_1.ApiError(401, "invalid refresh token", [
                "refresh token is invalid",
            ]));
        }
        const decodedToken = (jsonwebtoken_1.default.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET));
        const user = await user_model_1.User.findById(decodedToken?._id);
        if (!user)
            throw new ApiError_1.ApiError(401, "Invalid refresh token");
        if (incomingRefreshToken !== user?.refreshToken)
            throw new ApiError_1.ApiError(401, "Invalid refresh token");
        const cookieOptions = {
            httpOnly: true,
            secure: true,
        };
        const { accessToken, refreshToken } = await (0, exports.generateAccessAndRefreshTokens)(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(new ApiResponse_1.ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
    }
    catch (error) {
        throw new ApiError_1.ApiError(401, error?.message || "invalid refreshtoken");
    }
});
exports.changeCurrentPassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        throw new ApiError_1.ApiError(400, "please provide both passwords");
    }
    const user = await user_model_1.User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect)
        throw new ApiError_1.ApiError(400, "incorrect old password");
    if (oldPassword === newPassword) {
        throw new ApiError_1.ApiError(400, "new password cannot be same as old password");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, {}, "password changed successfully"));
});
exports.getCurrentUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, req.user, "current user fetched successfully"));
});
exports.updateAccountDetails = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { fullName, email } = req.body;
    console.log(req.body);
    if (!fullName && !email)
        throw new ApiError_1.ApiError(400, "atleast one field is required");
    const user = await user_model_1.User.findByIdAndUpdate(req.user?._id, {
        $set: {
            fullName,
            email,
        },
    }, { new: true }).select("-password");
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, user, "Account info updated successfully"));
});
exports.getUsersOrganisations = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userWithOrganisationsPipeLine = [
        {
            $match: { email: req.user.email },
        },
        {
            $lookup: {
                from: "organisations",
                localField: "_id",
                foreignField: "owner",
                as: "organisations",
            },
        },
        { $project: { organisations: 1 } },
    ];
    const usersOrganisations = await user_model_1.User.aggregate(userWithOrganisationsPipeLine);
});
//# sourceMappingURL=user.controllers.js.map