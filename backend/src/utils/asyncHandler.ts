import { NextFunction, Request, Response } from "express";
const asyncHandler =
  (requestHandler: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };

export default asyncHandler;
