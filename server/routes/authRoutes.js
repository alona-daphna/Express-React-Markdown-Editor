import express from 'express';
import { generatePreviewToken, login } from '../controllers/authController.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/generatePreviewToken/:fileId', generatePreviewToken);

export default router;
