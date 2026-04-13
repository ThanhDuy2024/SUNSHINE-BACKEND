import express from "express";
import authRoute from "./admin.route";
import agentRoute from "./agentManage.route";
import categoryRoute from './category.route';
import shippingRoute from './shipping.route';
import { adminMiddleware } from "../../middlewares/admins/admins.middleware";
const route = express.Router();

route.use('/auth', authRoute);
route.use('/agent', agentRoute);
route.use('/category', adminMiddleware, categoryRoute);
route.use('/shipping', adminMiddleware, shippingRoute);
export default route;