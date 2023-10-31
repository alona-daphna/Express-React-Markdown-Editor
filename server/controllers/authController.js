import dotenv from 'dotenv';
import {
  generateAccessToken,
  generatePasscode,
  passcodeToFileMap,
} from '../utils/auth.js';

dotenv.config();

export const login = (req, res) => {
  const { password } = req.body;

  if (password === process.env.PASSWORD) {
    res.json({ token: generateAccessToken() });
  } else {
    res.status(401).send('unauthorized');
  }
};

export const generatePreviewLink = (req, res) => {
  const fileId = req.params.fileId;
  const passcode = generatePasscode() + generatePasscode();
  passcodeToFileMap.set(passcode, fileId);
  const previewLink = process.env.BASE_URL + `files/preview/${passcode}`;
  res.json({ previewLink });
};
