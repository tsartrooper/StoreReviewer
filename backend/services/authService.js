import jwt from 'jsonwebtoken';
import { User } from '../index.js';

import dotenv from 'dotenv';

dotenv.config();

class AuthService {
  // Generate JWT token
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    });
  }

  // User login
  async login(email, password) {
    try {
      const user =  await User.findOne({ where: { email: email } });
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const token = this.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Normal user signup
  async signup(userData) {
    try {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      const user = await User.create({
        ...userData,
        role: 'normal_user',
      });

      const token = this.generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Update password
  async updatePassword(userId, oldPassword, newPassword) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await user.validatePassword(oldPassword);
      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      await user.update({ password: newPassword });
      return { message: 'Password updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  // Get user profile
  async getProfile(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'address', 'role', 'created_at'],
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}


const authServiceInstance = new AuthService();

export default authServiceInstance;