import express from "express";
import authRoute from './authentication.route';
import orderRoute from './order.route';
const route = express.Router();

route.use('/auth', authRoute);
route.use('/order', orderRoute);
export default route;