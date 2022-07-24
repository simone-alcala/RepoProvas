import { Request, Response, NextFunction } from 'express';

export default function hasToken(req: Request, res: Response, next: NextFunction) {
  
  const token = req.headers['authorization'] as string;

  if (!token) {
    throw { type: 'unauthorized', message: 'Invalid token' };
  }

  next();
}