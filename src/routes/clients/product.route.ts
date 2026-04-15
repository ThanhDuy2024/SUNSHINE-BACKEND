import express from 'express';
import * as productController from '../../controllers/clients/product.controller';
const route = express.Router();

route.get("/list", productController.getAllProductController);

export default route;