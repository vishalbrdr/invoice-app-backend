import mongoose from "mongoose";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { Response, Request } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { TokenPayload } from "../middlewares/auth.middlewares";
import jwt from "jsonwebtoken";

interface RequestWithTokenPayload extends Request {
  user: TokenPayload;
}

export const generateAccessAndRefreshTokens = async (
  userId: mongoose.Schema.Types.ObjectId
) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.create(req.body);

    if (!user)
      return res.status(500).json(new ApiError(500, "unable to create user"));

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User registered Successfully"
        )
      );
  }
);

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "username/email and password is required");
  }
  const user = await User.findOne({ email });

  if (!user?._id)
    return res.status(404).json(new ApiError(404, "user not found"));

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid)
    throw new ApiError(401, "incorrect password, please try again");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

export const logoutUser = asyncHandler(
  async (req: RequestWithTokenPayload, res) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, {}, "user logged out successfully"));
  }
);

export const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res
        .status(401)
        .json(
          new ApiError(401, "invalid refresh token", [
            "refresh token is invalid",
          ])
        );
    }

    const decodedToken = <TokenPayload>(
      jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid refresh token");

    if (incomingRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Invalid refresh token");

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid refreshtoken");
  }
});

export const changeCurrentPassword = asyncHandler(
  async (req: RequestWithTokenPayload, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      throw new ApiError(400, "please provide both passwords");
    }

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) throw new ApiError(400, "incorrect old password");

    if (oldPassword === newPassword) {
      throw new ApiError(400, "new password cannot be same as old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "password changed successfully"));
  }
);

export const getCurrentUser = asyncHandler(
  async (req: RequestWithTokenPayload, res) => {
    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "current user fetched successfully")
      );
  }
);

export const updateAccountDetails = asyncHandler(
  async (req: RequestWithTokenPayload, res) => {
    const { fullName, email } = req.body;
    console.log(req.body);

    if (!fullName && !email)
      throw new ApiError(400, "atleast one field is required");

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          fullName,
          email,
        },
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Account info updated successfully"));
  }
);

export const getUsersOrganisations = asyncHandler(
  async (req: RequestWithTokenPayload, res) => {
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
    const usersOrganisations = await User.aggregate(
      userWithOrganisationsPipeLine
    );
  }
);
