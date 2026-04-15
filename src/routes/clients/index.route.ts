import express from "express";
import authRoute from './authentication.route';
import orderRoute from './order.route';
import productRoute from './product.route';
import { clientMiddleware } from "../../middlewares/clients/client.middleware";
const route = express.Router();

route.use('/auth', authRoute);
route.use('/order', clientMiddleware, orderRoute);
route.use('/product', productRoute);
export default route;