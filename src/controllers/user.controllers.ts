import mongoose from "mongoose";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { Response, Request } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

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

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "username/email and password is required");
  }
  const user = await User.aggregate([
    {
      $match: { email },
    },
    {
      $lookup: {
        from: "organisations",
        localField: "_id",
        foreignField: "owner",
        as: "organisation",
      },
    },
  ])[0];

  if (!user) return res.status(404).json(new ApiError(404, "user not found"));

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid)
    return res
      .status(404)
      .json(new ApiError(401, "incorrect password, please try again"));

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
