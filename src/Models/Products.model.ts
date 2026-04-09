import { DataTypes } from "sequelize";
import { sequelize } from "../configs/mySQL.database";
import { Agents } from "./Agent.model";
import { Users } from "./Users.model";

export const Products = sequelize.define('products', {
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parameter: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    agentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true
})

Agents.hasMany(Products, {
  foreignKey: 'agentId',
  as: 'agent1'
});

Products.belongsTo(Agents, {
  foreignKey: 'agentId',
  as: 'agentedBy'
});

Users.hasMany(Products, {
  foreignKey: 'updatedBy',
  as: 'user1'
});

Products.belongsTo(Users, {
  foreignKey: 'updatedBy',
  as: 'product2'
});

Users.hasMany(Products, {
  foreignKey: 'createdBy',
  as: 'user2'
});

Products.belongsTo(Users, {
  foreignKey: 'createdBy',
  as: 'product3'
});
