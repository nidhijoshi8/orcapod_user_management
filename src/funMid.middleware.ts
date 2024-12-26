import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Its a function middleware for test Request...`, req.headers['content-type']);
  next();
};