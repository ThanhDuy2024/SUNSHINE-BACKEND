import express from 'express';
import registerRoute from './registerAgent.route';
import agentManageRoute from './agentManage.route';
import productRoute from './products.route';
import { clientMiddleware } from '../../middlewares/clients/client.middleware';
const route = express.Router();


route.use('/auth', clientMiddleware, registerRoute);
route.use('/manage', clientMiddleware, agentManageRoute);
route.use('/product', clientMiddleware, productRoute);

export default route;