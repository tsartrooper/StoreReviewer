import express from 'express';
import AuthController from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const authController = new AuthController();

const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// Protected routes
router.use(authenticate);

router.get('/profile', authController.getProfile);
router.put('/password', authController.updatePassword);
router.post('/logout', authController.logout);

export default router;