import express from 'express';
import * as agentManagerController from '../../controllers/agents/agentManage.controller';
const route = express.Router();

route.get('/detail', agentManagerController.getAgentController);

export default route;