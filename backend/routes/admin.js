import express from 'express';
import AdminController from '../controllers/adminController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();
const adminController = new AdminController();

// Protected routes for admin only
router.use(authenticate);  // Ensure the user is authenticated
router.use(authorize(['system_admin']));       // Ensure the user has admin privileges

// GET /api/admin/dashboard
router.get('/dashboard', (req, res) => adminController.getDashboardStats(req, res));

// GET /api/admin/users?name=&email=&address=&role=
router.get('/users', async (req, res) => {
  try {
    const users = await adminController.getAllUsers(req.query);
    res.status(200).json({ success: true, message: 'Users fetched', data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// GET /api/admin/stores?name=&email=&address=
router.get('/stores', async (req, res) => {
  try {
    const stores = await adminController.getAllStoresForAdmin(req.query);
    res.status(200).json({ success: true, message: 'Stores fetched', data: stores });
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stores' });
  }
});

export default router;
