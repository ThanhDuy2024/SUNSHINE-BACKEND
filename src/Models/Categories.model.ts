import { DataTypes } from "sequelize";
import { sequelize } from "../configs/mySQL.database";
import { Admin } from "./Admins.model";

export const Categories = sequelize.define('categories', {
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
})

Admin.hasMany(Categories, {
  foreignKey: 'createdBy',
  as: 'categories1'
});

Categories.belongsTo(Admin, {
  foreignKey: 'createdBy',
  as: 'createdByAdmin'
});

Admin.hasMany(Categories, {
  foreignKey: 'updatedBy',
  as: 'categories2'
});

Categories.belongsTo(Admin, {
  foreignKey: 'updatedBy',
  as: 'updatedByAdmin'
});