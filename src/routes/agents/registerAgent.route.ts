import express from 'express';
import * as agentController from '../../controllers/agents/registerAgent.controller';
import multer from 'multer';
import { storage } from '../../helpers/cloudinary.helper';
const route = express.Router();

const upload = multer({
    storage: storage
})

route.post('/register', upload.single('image'), agentController.registerAgentController);

export default route;