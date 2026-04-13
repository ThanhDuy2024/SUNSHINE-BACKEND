import { DataTypes } from "sequelize";
import { sequelize } from "../configs/mySQL.database";
import { Orders } from "./Orders.model";
import { Admin } from "./Admins.model";

export const Shipping = sequelize.define('shipping', {
  shippingName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shippingDuring: {
    type: DataTypes.STRING,
    allowNull: false
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  }
}, {
  timestamps: true
})

Shipping.hasMany(Orders, {
  foreignKey: 'shippingId',
  as: 'orders'
})

Orders.belongsTo(Shipping, {
  foreignKey: 'shippingId',
  as: 'shipping'
})

Shipping.belongsTo(Admin, {
  foreignKey: "createdBy",
  as: 'createdByAdmin'
})

Shipping.belongsTo(Admin, {
  foreignKey: "updatedBy",
  as: 'updatedByAdmin'
})