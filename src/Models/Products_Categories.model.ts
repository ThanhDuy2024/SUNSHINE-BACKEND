import { sequelize } from "../configs/mySQL.database";
import { Categories } from "./Categories.model";
import { Products } from "./Products.model";

export const Products_Categories = sequelize.define('products_categories', {}, {timestamps: true});

Products.belongsToMany(Categories, { through: Products_Categories });
Categories.belongsToMany(Products, { through: Products_Categories });