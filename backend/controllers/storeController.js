import StoreQueries from '../queries/storeQueries.js';

const StoreController = {

  async getStoreById(req, res) {
    try {
      const storeId = req.params.id;
      const store = await StoreQueries.getStoreWithStats(storeId);

      if (!store) {
        return res.status(404).json({ success: false, message: 'Store not found' });
      }

      return res.status(200).json({ success: true, data: store });
    } catch (err) {
      console.error('Error fetching store:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  async getAllStores(req, res) {
    try {
      const userId = req.user?.id || null; // If using JWT middleware
      const stores = await StoreQueries.getAllStoresWithRatings(userId);

      return res.status(200).json({ success: true, data: stores });
    } catch (err) {
      console.error('Error fetching stores:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  
};

export default StoreController;