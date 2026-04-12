import { DataTypes } from "sequelize";
import { sequelize } from "../configs/mySQL.database";
import { OrdersProducts } from "./Orders_Products.model";
import { Users } from "./Users.model";

export const Orders = sequelize.define('orders', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: 'unpay'
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'inactive'
  },
  shippingTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  shippingPrice: {
    type: DataTypes.STRING,
    allowNull: true
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true
})

Orders.hasMany(OrdersProducts, {
  foreignKey: "orderId",
  as: "products"
})

OrdersProducts.belongsTo(Orders, {
  as: "orders"
})

Users.hasMany(Orders, {
  foreignKey: "userId",
  as: 'orders'
})

Orders.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'users',
})