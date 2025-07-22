import AdminQueries from "../queries/adminQueries.js";
import { User, Store, Rating } from "../index.js";


// System Admin Service
const AdminService = {
  // Get dashboard statistics
  async getDashboardStats() {
    try {
      return await AdminQueries.getDashboardStats();
    } catch (error) {
      throw error;
    }
  },

  // Add new user (normal user, admin, or store owner)
  async addUser(userData) {
    try {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      const user = await User.create(userData);

      // If creating a store owner, also create their store
      if (userData.role === 'store_owner' && userData.storeData) {
        await Store.create({
          ...userData.storeData,
          owner_id: user.id,
        });
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        is_active: user.is_active,
      };
    } catch (error) {
      throw error;
    }
  },

  // Get all users with filters
  async getAllUsers(filters = {}) {
    try {
      return await AdminQueries.getAllUsers(filters);
    } catch (error) {
      throw error;
    }
  },

  // Get all stores with filters
  async getAllStores(filters = {}) {
    try {
      return await AdminQueries.getAllStoresForAdmin(filters);
    } catch (error) {
      throw error;
    }
  },

  // Get user details by ID
  async getUserDetails(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'address', 'role', 'is_active', 'created_at'],
        include: [
          {
            model: Store,
            as: 'ownedStores',
            required: false,
            include: [{
              model: Rating,
              as: 'ratings',
              required: false,
            }],
          },
        ],
      });

      if (!user) {
        throw new Error('User not found');
      }

      const userData = user.toJSON();

      // Add average rating for store owners
      if (userData.role === 'store_owner' && userData.ownedStores.length > 0) {
        const store = userData.ownedStores[0];
        const storeModel = await Store.findByPk(store.id);
        userData.averageRating = await storeModel.getAverageRating();
      }

      return userData;
    } catch (error) {
      throw error;
    }
  },

  // Add new store
  async addStore(storeData, ownerId) {
    try {
      const owner = await User.findOne({
        where: { id: ownerId, role: 'store_owner' },
      });

      if (!owner) {
        throw new Error('Store owner not found');
      }

      const existingStore = await Store.findOne({ where: { owner_id: ownerId } });
      if (existingStore) {
        throw new Error('Store owner already has a store');
      }

      const store = await Store.create({
        ...storeData,
        owner_id: ownerId,
      });

      return store;
    } catch (error) {
      throw error;
    }
  },
};



export default AdminService;