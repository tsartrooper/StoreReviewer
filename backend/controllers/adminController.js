import AdminService from '../services/adminService.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js'; // assuming you have these utils

class AdminController {
  // Get dashboard statistics
  async getDashboardStats(req, res) {
    try {
      const stats = await AdminService.getDashboardStats();
      return successResponse(res, stats, "Dashboard Stats", 200);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  // Add new user (admin, store_owner, or normal user)
  async addUser(req, res) {
    try {
      const createdByAdminId = req.user.id; // assuming user info is attached by auth middleware
      const user = await AdminService.addUser(req.body, createdByAdminId);
      return successResponse(res, user, 'User created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  // Get all users with filters
  async getAllUsers(req, res) {
    try {
      const filters = req.query;
      const users = await AdminService.getAllUsers(filters);
      return successResponse(res, users, 'Users fetched successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  // Get all stores with filters
  async getAllStores(req, res) {
    try {
      const filters = req.query;
      const stores = await AdminService.getAllStores(filters);
      return successResponse(res, stores, 'Stores fetched successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }

  // Get single user details
  async getUserDetails(req, res) {
    try {
      const userId = req.params.id;
      const user = await AdminService.getUserDetails(userId);
      return successResponse(res, user, 'User details fetched', 200);
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  // Add a new store
  async addStore(req, res) {
    try {
      const { ownerId } = req.body;
      const store = await AdminService.addStore(req.body, ownerId);
      return successResponse(res, store, 'Store created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

export default AdminController;
