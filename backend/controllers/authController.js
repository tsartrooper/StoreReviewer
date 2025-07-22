import AuthService from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

class AuthController {
  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResponse(res, 'Email and password are required', 400);
      }

      const result = await AuthService.login(email, password);
      successResponse(res, result, 'Login successful', 200);
    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Invalid credentials') {
        return errorResponse(res, 'Invalid email or password', 401);
      }
      errorResponse(res, 'Login failed', 500);
    }
  }

  // POST /api/auth/signup
  async signup(req, res) {
    try {
      const { name, email, password, address } = req.body;

      if (!name || !email || !password || !address) {
        return errorResponse(res, 'All fields are required', 400);
      }

      const result = await AuthService.signup({ name, email, password, address });
      successResponse(res, result, 'Account created successfully', 201);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message === 'User already exists with this email') {
        return errorResponse(res, error.message, 409);
      }
      errorResponse(res, 'Signup failed', 500);
    }
  }

  // PUT /api/auth/password
  async updatePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      if (!oldPassword || !newPassword) {
        return errorResponse(res, 'Old password and new password are required', 400);
      }

      if (newPassword.length < 6) {
        return errorResponse(res, 'New password must be at least 6 characters long', 400);
      }

      const result = await AuthService.updatePassword(userId, oldPassword, newPassword);
      successResponse(res, result, 'Password updated successfully');
    } catch (error) {
      console.error('Update password error:', error);
      if (error.message === 'Current password is incorrect') {
        return errorResponse(res, error.message, 400);
      }
      errorResponse(res, 'Failed to update password', 500);
    }
  }

  // GET /api/auth/profile
  async getProfile(req, res) {

    console.log("profile");
    try {
      const userId = req.user.id;
      const profile = await AuthService.getProfile(userId);
      return successResponse(res, profile, 'Profile retrieved successfully');
      // console.log("profile");
    } catch (error) {
      console.error('Get profile error:', error);
      return errorResponse(res, 'Failed to retrieve profile', 500);
    }
  }

  // POST /api/auth/logout
  async logout(req, res) {
    try {
      successResponse(res, null, 'Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      errorResponse(res, 'Logout failed', 500);
    }
  }
}

export default AuthController;