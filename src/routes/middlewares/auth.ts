import { Request, Response, NextFunction } from 'express';
import config from 'config';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization');
  if (!authorization || !authorization.startsWith('Bearer')) {
    console.warn('[WARN] invalid authorization header');
    res.status(400).json({ message: 'BadRequest' });
    return;
  }
  const token = authorization.slice('Bearer'.length).trim();

  if (!token) {
    console.warn(`[WARN] invalid authorization token`);
    res.status(400).json({ message: 'Invalid token' });
    return;
  }

  if (config.get('API.CALENDAR.TOKEN') !== token) {
    console.warn(`[WARN] invalid authrozation token ${token}`);
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  next();
};
