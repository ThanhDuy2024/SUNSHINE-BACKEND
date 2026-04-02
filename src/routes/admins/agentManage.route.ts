import express from "express";
import { adminMiddleware } from "../../middlewares/admins/admins.middleware";
import * as agentManager from '../../controllers/admins/agentManage.controller';
const route = express.Router();

route.get('/list', adminMiddleware, agentManager.getAllAgentController)
route.put('/action', adminMiddleware, agentManager.acceptOrDenyController)
export default route