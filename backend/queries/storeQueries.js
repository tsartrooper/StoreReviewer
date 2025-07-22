import { Store, User, Rating } from '../index.js';

const StoreQueries = {
  // Get store with average rating and total ratings
  async getStoreWithStats(storeId) {
    const store = await Store.findByPk(storeId, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Rating,
          as: 'ratings',
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          }],
        },
      ],
    });

    if (!store) return null;

    const averageRating = await store.getAverageRating();
    const totalRatings = await store.getTotalRatings();

    return {
      ...store.toJSON(),
      averageRating,
      totalRatings,
    };
  },

  // Get all stores with ratings for normal users
  async getAllStoresWithRatings(userId = null) {
    const stores = await Store.findAll({
      where: { is_active: true },
      include: [
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
        
        let userRating = null;
        if (userId) {
          const rating = await Rating.findOne({
            where: { user_id: userId, store_id: store.id },
          });
          userRating = rating ? rating.rating : null;
        }

        return {
          id: store.id,
          name: store.name,
          address: store.address,
          averageRating,
          totalRatings,
          userRating,
        };
      })
    );

    return storesWithStats;
  },

  // Search stores by name or address
  async searchStores(query, userId = null) {
    const { Op } = require('sequelize');
    
    const stores = await Store.findAll({
      where: {
        is_active: true,
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { address: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
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
        
        let userRating = null;
        if (userId) {
          const rating = await Rating.findOne({
            where: { user_id: userId, store_id: store.id },
          });
          userRating = rating ? rating.rating : null;
        }

        return {
          id: store.id,
          name: store.name,
          address: store.address,
          averageRating,
          totalRatings,
          userRating,
        };
      })
    );

    return storesWithStats;
  },
};

export default StoreQueries;