import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface Token {
  userId: string;
  token: string;
}

// export interface AuthResponse extends Request {
//   isAuth?: boolean;
//   userId: string;
// }

declare module 'express-serve-static-core' {
  interface Request {
    isAuth?: boolean;
    userId: string;
  }
}

export default (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'supersecretsecret');
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = (decodedToken as Token).userId;
  req.isAuth = true;

  next();
};
