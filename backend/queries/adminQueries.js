import { User, Store, Rating } from "../index.js";

class AdminQueries {
  // Get dashboard statistics
  async getDashboardStats() {
    const totalUsers = await User.count();
    const totalNormalUsers = await User.count({ where: { role: 'normal_user' } });
    const totalStoreOwners = await User.count({ where: { role: 'store_owner' } });
    const totalAdmins = await User.count({ where: { role: 'system_admin' } });
    const totalStores = await Store.count();
    const totalActiveStores = await Store.count({ where: { is_active: true } });
    const totalRatings = await Rating.count();

    return {
      totalUsers,
      totalNormalUsers,
      totalStoreOwners,
      totalAdmins,
      totalStores,
      totalActiveStores,
      totalRatings,
    };
  }

  // Get all users with filters
  async getAllUsers(filters = {}) {
    const { Op } = require('sequelize');
    const whereClause = {};

    if (filters.name) {
      whereClause.name = { [Op.like]: `%${filters.name}%` };
    }
    if (filters.email) {
      whereClause.email = { [Op.like]: `%${filters.email}%` };
    }
    if (filters.address) {
      whereClause.address = { [Op.like]: `%${filters.address}%` };
    }
    if (filters.role) {
      whereClause.role = filters.role;
    }

    const users = await User.findAll({
      where: whereClause,
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
      order: [['name', 'ASC']],
    });

    // Add average rating for store owners
    const usersWithRatings = await Promise.all(
      users.map(async (user) => {
        const userData = user.toJSON();
        
        if (userData.role === 'store_owner' && userData.ownedStores.length > 0) {
          const store = userData.ownedStores[0];
          const storeModel = await Store.findByPk(store.id);
          userData.averageRating = await storeModel.getAverageRating();
        }

        return userData;
      })
    );

    return usersWithRatings;
  }

  // Get all stores with filters for admin
  async getAllStoresForAdmin(filters = {}) {
    const { Op } = require('sequelize');
    const whereClause = {};

    if (filters.name) {
      whereClause.name = { [Op.like]: `%${filters.name}%` };
    }
    if (filters.email) {
      whereClause.email = { [Op.like]: `%${filters.email}%` };
    }
    if (filters.address) {
      whereClause.address = { [Op.like]: `%${filters.address}%` };
    }

    const stores = await Store.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Rating,
          as: 'ratings',
          required: false,
        },
      ],
      order: [['name', 'ASC']],
    });

    const storesWithStats = await Promise.all(
      stores.map(async (store) => {
        const averageRating = await store.getAverageRating();
        const totalRatings = await store.getTotalRatings();

        return {
          ...store.toJSON(),
          averageRating,
          totalRatings,
        };
      })
    );

    return storesWithStats;
  }
};


const adminQueriesInstance = new AdminQueries();

export default adminQueriesInstance;