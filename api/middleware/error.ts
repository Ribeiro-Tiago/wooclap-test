import { CustomError, Request, Response, Next } from "../types/server";

export const handleError = async (req: Request, res: Response, next: Next) => {
  res.error = (err: CustomError) => {
    res.statusCode = err.status || 500;
    res.json(err);
  };

  next();
};
