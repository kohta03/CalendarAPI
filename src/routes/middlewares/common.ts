import { Request, Response, NextFunction } from 'express';

export const logging = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`START ${req.originalUrl}`);
  next();
};

export const handleError = (name: string, status: number = 200, body: unknown) => {
  return (err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(`[ERROR] ${name} uncaught error ${err}`);
    if (res.headersSent) {
      return next(err);
    }
    return res.status(status).json(body);
  };
};
