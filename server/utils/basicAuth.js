import dotenv from 'dotenv';

dotenv.config();

export const basicAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      'base64'
    ).toString();
    const [username, password] = decodedCredentials.split(':');

    if (
      username === process.env.BA_USERNAME &&
      password === process.env.BA_PASSWORD
    ) {
      next();
    }
  }
  res.status(401).send('Unauthorized');
};
