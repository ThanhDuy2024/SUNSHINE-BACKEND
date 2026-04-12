import express from 'express';
import { clientMiddleware } from '../../middlewares/clients/client.middleware';
import * as orderController from '../../controllers/clients/order.controller';
const route = express.Router();

route.post('/create', clientMiddleware, orderController.postOrderController);
route.get('/list', clientMiddleware, orderController.getAllOrderController);
route.put('/update/:id', clientMiddleware, orderController.putOrderController);
route.get('/detail/:id', clientMiddleware, orderController.getOrderController);
route.delete('/delete/:id', clientMiddleware, orderController.deleteOrderController);
export default route;