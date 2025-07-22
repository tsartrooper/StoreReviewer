
// Rating Model
export default ( sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'ratings',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'store_id'],
        name: 'unique_user_store_rating',
      },
    ],
  },
  {
    timestamps: false 
  }
);

  return Rating;
}
