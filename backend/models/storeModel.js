
// Store Model
export default (sequelize, DataTypes) =>{
  const Store = sequelize.define('Store', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'stores',
  },
  {
    timestamps: false 
  }
);


  Store.prototype.getAverageRating = async function() {
    const ratings = await this.getRatings();
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return parseFloat((sum / ratings.length).toFixed(2));
  };

  Store.prototype.getTotalRatings = async function() {
    const ratings = await this.getRatings();
    return ratings.length;
  };

  return Store;
}