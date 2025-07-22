import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';


// require('dotenv').config();

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: 'players',
  user: 'root',
  password: 'Nrf57-hk83#',
  host: 'localhost',
  port: 3306,
  define: {
        timestamps: false
    }
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export {sequelize, testConnection };