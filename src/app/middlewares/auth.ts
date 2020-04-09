import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { promisify } from 'util';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    const { userId, username } = <IToken>decoded;
    res.locals.userId = userId;
    res.locals.username = username;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
