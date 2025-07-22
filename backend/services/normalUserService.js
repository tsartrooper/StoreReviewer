// Normal User Service
const NormalUserService = {
  // Get all stores for normal user
  async getAllStores(userId) {
    try {
      return await StoreQueries.getAllStoresWithRatings(userId);
    } catch (error) {
      throw error;
    }
  },

  // Search stores by name or address
  async searchStores(query, userId) {
    try {
      return await StoreQueries.searchStores(query, userId);
    } catch (error) {
      throw error;
    }
  },

  // Submit or update rating for a store
  async submitRating(userId, storeId, ratingValue, comment = null) {
    try {
      const store = await Store.findByPk(storeId);
      if (!store || !store.is_active) {
        throw new Error('Store not found or inactive');
      }

      const [rating, created] = await Rating.upsert({
        user_id: userId,
        store_id: storeId,
        rating: ratingValue,
        comment: comment,
      });

      return {
        rating,
        isNew: created,
        message: created ? 'Rating submitted successfully' : 'Rating updated successfully',
      };
    } catch (error) {
      throw error;
    }
  },
};


export { NormalUserService };