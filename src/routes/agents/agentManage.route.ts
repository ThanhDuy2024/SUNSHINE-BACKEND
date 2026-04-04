import express from 'express';
import * as agentManagerController from '../../controllers/agents/agentManage.controller';
import { clientMiddleware } from '../../middlewares/clients/client.middleware';
import multer from 'multer';
import { storage } from '../../helpers/cloudinary.helper';
const route = express.Router();
const upload = multer({
    storage: storage,
})
route.get('/detail', agentManagerController.getAgentController);
route.put('/update', clientMiddleware, upload.single('image'), agentManagerController.putAgentController);
export default route;