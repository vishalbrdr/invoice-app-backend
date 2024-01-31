import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { Request } from "express";

type TokenPayload = {
  _id: string;
  email: string;
  fullName: string;
};

interface RequestWithUser extends Request {
  user?: TokenPayload;
}

export const verifyJWT = asyncHandler(
  async (req: RequestWithUser, res, next) => {
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
