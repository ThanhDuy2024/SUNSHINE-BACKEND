import express from 'express';
import { clientMiddleware } from '../../middlewares/clients/client.middleware';
import * as orderController from '../../controllers/clients/order.controller';
const route = express.Router();

route.post('/create', orderController.postOrderController);
route.get('/list', orderController.getAllOrderController);
route.put('/update/:id', orderController.putOrderController);
route.get('/detail/:id', orderController.getOrderController);
route.delete('/delete/:id', orderController.deleteOrderController);
export default route;