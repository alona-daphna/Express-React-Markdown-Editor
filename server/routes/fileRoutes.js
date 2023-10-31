import express from 'express';
import {
  updateFile,
  deleteFile,
  createFile,
  previewFile,
} from '../controllers/fileController.js';

const router = express.Router();

router.route('/').post(createFile);
router.route('/:id').patch(updateFile);
router.route('/:id').delete(deleteFile);
router.route('/preview/:passcode').get(previewFile);

export default router;
