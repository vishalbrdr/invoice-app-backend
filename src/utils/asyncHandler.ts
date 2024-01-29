import { Request, Response, NextFunction } from "express";

type requestHandlerType = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

const asyncHandler = (requestHandler: requestHandlerType) => {
  return async (req: Request, res: Response, next?: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (err) {
      if (next) {
        next(err);
      }
    }
  };
};

export { asyncHandler };
