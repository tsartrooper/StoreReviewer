import { sequelize } from'./config/database.js';
import { DataTypes } from '@sequelize/core';

import ratingModel from './models/ratingModel.js';
import userModel from './models/userModel.js';
import storeModel from './models/storeModel.js';

const User = userModel(sequelize, DataTypes);
const Store = storeModel(sequelize, DataTypes);
const Rating = ratingModel(sequelize, DataTypes);

Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Store, { foreignKey: 'owner_id', as: 'ownedStores' });

Rating.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Rating, { foreignKey: 'user_id', as: 'submittedRatings' });

Rating.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
Store.hasMany(Rating, { foreignKey: 'store_id', as: 'ratings' });

const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false }); // Set to true to alter tables
      console.log('Database synchronized successfully.');
    }
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

export {
  sequelize,
  User,
  Store,
  Rating,
  syncDatabase,
};