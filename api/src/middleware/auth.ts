import jwt from 'jsonwebtoken';

interface Token {
  userId: string;
  token: string;
}

export default (req: any, res: any, next: any) => {
  const authHeader = req.get('Authorization');
  console.log('authHeader', authHeader);

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'supersecretsecret');
    console.log('333', decodedToken);
  } catch (err) {
    console.log('444');
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    console.log('555');
    req.isAuth = false;
    return next();
  }
  req.userId = (decodedToken as Token).userId;
  req.isAuth = true;

  console.log('IN AUTH MIDDLEWARE', req.isAuth);
  next();
};
