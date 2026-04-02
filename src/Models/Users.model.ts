import { DataTypes } from "sequelize";
import { sequelize } from "../configs/mySQL.database";

export const Users = sequelize.define("users", {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: true,
})