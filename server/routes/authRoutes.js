import express from 'express';
import { generatePreviewLink, login } from '../controllers/authController.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/generatePreviewLink/:fileId', authMiddleware, generatePreviewLink);

export default router;
