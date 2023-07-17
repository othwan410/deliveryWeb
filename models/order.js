'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Store, {
        targetKey: 'store_id',
        foreignKey: 'store_id',
      });
      this.belongsTo(models.Address, {
        targetKey: 'address_id',
        foreignKey: 'address_id',
      });
      this.hasMany(models.Order_menu, {
        sourceKey: 'order_id',
        forignKey: 'order_id',
      });
      this.hasOne(models.Review, {
        sourceKey: 'order_id',
        foreignKey: 'order_id',
      });
    }
  }
  Order.init(
    {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      request: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Order',
      tableName: 'orders',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Order;
};
