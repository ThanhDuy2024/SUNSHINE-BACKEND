import express from 'express';
import * as orderController from '../../controllers/agents/order.controller';
const route = express.Router();

route.get('/list', orderController.getAllOrderController);
route.get('/detail/:id', orderController.getOrderController);
route.put('/update/:id', orderController.putOrderController);
export default route;