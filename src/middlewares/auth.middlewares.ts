import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { Organisation } from "../models/organisation.model";
import mongoose from "mongoose";
import { isValidObjectId } from "../utils/isValidObjectId";

export type TokenPayload = {
  _id: mongoose.Types.ObjectId;
  email: string;
  fullName: string;
};

interface CustomRequest extends Request {
  user?: TokenPayload;
}

export const isAuthenticated = asyncHandler(
  async (req: CustomRequest, res, next) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) throw new ApiError(401, "Unauthorized request");

      const decodedToken = <TokenPayload>(
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      );
      // console.log(decodedToken);

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) throw new ApiError(401, "Invalid Access Token");

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "invalid token");
    }
  }
);

export const isAuthorised = asyncHandler(
  async (req: CustomRequest, res, next) => {
    const { _id: userId } = <TokenPayload>req.body;
    const { orgId: organisationId } = req.params;

    if (!isValidObjectId(organisationId))
      throw new ApiError(400, "invalid organisation id", [
        "invalid organisation id",
      ]);
    const organisation = await Organisation.findById(organisationId);

    if (organisation?.owner === userId) return res.json(organisation);
    next();
  }
);
