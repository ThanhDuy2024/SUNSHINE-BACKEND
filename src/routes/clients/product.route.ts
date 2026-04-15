import express from 'express';
import * as productController from '../../controllers/clients/product.controller';
const route = express.Router();

route.get("/list", productController.getAllProductController);
route.get("/detail/:id", productController.detailProductController);
export default route;