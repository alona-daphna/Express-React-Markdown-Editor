import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateAccessToken = () => {
  // TODO: add refresh tokens
  // return jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  return jwt.sign({}, process.env.TOKEN_SECRET);
};

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: 'unauthorized' });

  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) return res.status(401).json({ error: 'unauthorized' });

    next();
  });
};
