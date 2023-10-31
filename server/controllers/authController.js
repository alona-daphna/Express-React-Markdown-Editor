import {
  generateAccessToken,
  generatePasscode,
  passcodeToFileMap,
} from '../utils/auth.js';

export const login = (req, res) => {
  const { password } = req.body;

  if (password === process.env.PASSWORD) {
    res.json({ token: generateAccessToken() });
  } else {
    res.status(401).send('unauthorized');
  }
};

export const generatePreviewToken = (req, res) => {
  const fileId = req.params.fileId;
  const passcode = generatePasscode() + generatePasscode();
  const keyToDelete = [...passcodeToFileMap.entries()].find(
    ([, value]) => value === fileId
  )?.[0];

  if (keyToDelete) {
    passcodeToFileMap.delete(keyToDelete);
  }
  passcodeToFileMap.set(passcode, fileId);
  res.json({ token: passcode });
};
