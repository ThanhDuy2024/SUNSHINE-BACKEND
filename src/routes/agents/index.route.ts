import express from 'express';
import registerRoute from './registerAgent.route';
import agentManageRoute from './agentManage.route';
import { clientMiddleware } from '../../middlewares/clients/client.middleware';
const route = express.Router();


route.use('/auth', clientMiddleware, registerRoute);
route.use('/manage', clientMiddleware, agentManageRoute);

export default route;