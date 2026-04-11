import express from 'express';
import { clientMiddleware } from '../../middlewares/clients/client.middleware';
import * as orderController from '../../controllers/clients/order.controller';
const route = express.Router();

route.post('/create', clientMiddleware, orderController.postOrderController);

export default route;