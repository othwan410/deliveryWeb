'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        targetKey: 'category_id',
        foreignKey: 'category_id',
      });
      this.hasMany(models.Dids, {
        foreignKey: 'store_id',
        sourceKey: 'store_id',
      });
      this.hasMany(models.Order, {
        foreignKey: 'store_id',
        sourceKey: 'store_id',
      });
      this.hasMany(models.Menu, {
        foreignKey: 'store_id',
        sourceKey: 'store_id',
      });
      this.belongsTo(models.User, {
        targetKey: 'user_id',
        foreignKey: 'user_id',
      });
    }
  }
  Store.init(
    {
      store_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      call: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Store',
      tableName: 'stores',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Store;
};
