import { DataTypes } from "sequelize";
import { sequelize } from "../configs/mySQL.database";
import { Users } from "./Users.model";
import { Admin } from "./Admins.model";

export const Agents = sequelize.define('agents', {
    agentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    earnPrice: {
        type: DataTypes.STRING,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'notAc'
    },
    acceptBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    bannedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: true
})

Users.hasOne(Agents, {
  foreignKey: 'userId',
  as: 'agent'
});

Agents.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user'
});

Admin.hasMany(Agents, {
    foreignKey: 'acceptBy',
    as: 'admin'
})

Agents.belongsTo(Admin, {
    foreignKey: 'acceptBy',
    as: 'admin'
})

Admin.hasMany(Agents, {
    foreignKey: 'bannedBy',
    as: 'admin2'
})

Agents.belongsTo(Admin, {
    foreignKey: 'bannedBy',
    as: 'admin2'
})