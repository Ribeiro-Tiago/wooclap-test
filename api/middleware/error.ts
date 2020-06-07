import { CustomError, Request, Response, Next } from "../types/server";

export const handleError = async (req: Request, res: Response, next: Next) => {
  res.error = (err: CustomError, errors?: Object) => {
    res.statusCode = err.status || 500;

    if (!errors) {
      return res.json(err);
    }

    const formattedErrors = Object.entries(errors).reduce((accu, curr) => {
      accu.push({ key: curr[0], message: curr[1] });

      return accu;
    }, []);

    res.json({ ...err, errors: formattedErrors });
  };

  next();
};
