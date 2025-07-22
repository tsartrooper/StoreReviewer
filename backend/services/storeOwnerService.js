// Store Owner Service
const StoreOwnerService = {
  // Get store owner dashboard
  async getDashboard(ownerId) {
    try {
      return await StoreOwnerQueries.getOwnerDashboard(ownerId);
    } catch (error) {
      throw error;
    }
  },

  // Get users who rated the store
  async getUsersWhoRated(ownerId) {
    try {
      const store = await Store.findOne({ where: { owner_id: ownerId } });
      if (!store) {
        throw new Error('Store not found');
      }

      const ratings = await Rating.findAll({
        where: { store_id: store.id },
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'address'],
        }],
        order: [['created_at', 'DESC']],
      });

      return ratings;
    } catch (error) {
      throw error;
    }
  },

  // Get store statistics
  async getStoreStats(ownerId) {
    try {
      const store = await Store.findOne({ where: { owner_id: ownerId } });
      if (!store) {
        throw new Error('Store not found');
      }

      const averageRating = await store.getAverageRating();
      const totalRatings = await store.getTotalRatings();

      const ratingDistribution = await Rating.findAll({
        where: { store_id: store.id },
        attributes: [
          'rating',
          [Rating.sequelize.fn('COUNT', Rating.sequelize.col('rating')), 'count'],
        ],
        group: ['rating'],
        order: [['rating', 'ASC']],
      });

      return {
        storeInfo: {
          id: store.id,
          name: store.name,
          email: store.email,
          address: store.address,
        },
        averageRating,
        totalRatings,
        ratingDistribution: ratingDistribution.map(entry => ({
          rating: entry.rating,
          count: parseInt(entry.get('count'), 10),
        })),
      };
    } catch (error) {
      throw error;
    }
  },
};


module.exports = {
  StoreOwnerService
};
